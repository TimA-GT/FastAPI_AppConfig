import httpx
from fastapi import FastAPI
from fastapi_utils.tasks import repeat_every

from appconfig_helper import AppConfigHelper

app = FastAPI()

appconfig = AppConfigHelper(appconfig_application='8pzhwwu',
                            appconfig_environment='7xtdtg1',
                            appconfig_profile='fyg22o7',
                            max_config_age=15)


@app.on_event("startup")
@repeat_every(seconds=60 * 5)
def update_app_config() -> None:
    if appconfig.update_config():
        print("Received new configuration")
    else:
        print("no new configuration")


@app.get("/")
async def return_config():
    return appconfig.config


@app.get("/btc")
async def root():
    r = httpx.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    return r.json()


