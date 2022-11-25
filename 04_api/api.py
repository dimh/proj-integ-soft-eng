import pandas as pd
import pickle
from sanic import Sanic
from sanic.response import json as json_response


app = Sanic("ModelApiApp")
model = pickle.load(open('/opt/model_app/model.pkl', 'rb'))


from typing import Iterable


def _add_cors_headers(response, methods: Iterable[str]) -> None:
    allow_methods = list(set(methods))
    if "OPTIONS" not in allow_methods:
        allow_methods.append("OPTIONS")
    headers = {
        "Access-Control-Allow-Methods": ",".join(allow_methods),
        "Access-Control-Allow-Origin": "*",
    }
    response.headers.extend(headers)


def add_cors_headers(request, response):
    if request.method != "OPTIONS":
        methods = [method for method in request.route.methods]
        _add_cors_headers(response, methods)
 

async def get_df(data: dict, range_age: int):

    columns_new_df = [
        'mt2_solicitados',
        'rango_edad',
        'turn_category_afternoon',
        'turn_category_morning',
        'turn_category_night',
        'area_category_green_areas',
        'area_category_offices',
        'area_category_public_areas'
    ]
    mts2 = int(data['mts2'])
    turn_category_afternoon = 1 if data['turn_category'] == 'afternoon' else 0
    turn_category_morning = 1 if data['turn_category'] == 'morning' else 0
    turn_category_night = 1 if data['turn_category'] == 'night' else 0

    if turn_category_afternoon == 0 and turn_category_morning == 0 and turn_category_night == 0:
        return None

    area_category_green_areas =  1 if data['area_category'] == 'green_areas' else 0
    area_category_offices =  1 if data['area_category'] == 'offices' else 0
    area_category_public_areas =  1 if data['area_category'] == 'public_areas' else 0
    if area_category_green_areas == 0 and area_category_offices == 0 and area_category_public_areas == 0:
        return None

    data_new_df = [[
        mts2,
        range_age,
        turn_category_afternoon,
        turn_category_morning,
        turn_category_night,
        area_category_green_areas,
        area_category_offices,
        area_category_public_areas,
    ]]
    
    new_df = pd.DataFrame(data_new_df, columns=columns_new_df)
    return new_df


async def get_range_description(n):
    ranges = {
        1: "people between 18 and 30 years",
        2: "people between 31 and 45 years",
        3: "people between 46 and 55 years",
        4: "people between 56 years and older",
    }
    return ranges[n]

@app.get("/predict/")
async def predict(request):
    payload = request.query_args
    payload = {ele[0]: ele[1] for ele in payload}
    print("******************")
    print(payload)
    print("******************")
    response_payload = {}
    for range_age in range(1, 5):
        description = await get_range_description(range_age)
        new_payload = await get_df(payload, range_age)
        if new_payload is not None:
            response = model.predict(new_payload)
            response_payload[description] = response[0]
        else:
            return json_response({'error': 'data not valid'})
    print(response_payload)
    return json_response(response_payload)

app.register_middleware(add_cors_headers, "response")

app.run(
    host="0.0.0.0",
    port=80,
    access_log=False,
    debug=True,
    workers=2,
)