"""
This file should be changed to suit your browser, \n
it currently has Edge, Vivaldi and Firefox options \n
which can be switched by changing the called driver function below
"""

import subprocess



def GetDriverEdge():
    """Edge"""
    from selenium import webdriver
    from selenium.webdriver.edge.service import Service as EdgeService
    from selenium.webdriver.edge.options import Options as EdgeOptions

    options = EdgeOptions()
    options.binary_location = "/var/lib/flatpak/app/com.microsoft.Edge/x86_64/stable/dc70ef8922e1b20d5e951c8e185ccb15f940089a4e79589adea7a4d64682b881/files/extra/microsoft-edge"
    driver_path="./drivers/msedgedriver"

    # Inicie o navegador Edge
    driveredge = webdriver.Edge(service=EdgeService(driver_path), options=options)
    return driveredge

def GetDriverVivaldi():
    """Vivaldi"""
    from selenium import webdriver
    from selenium.webdriver import ChromeOptions
    from selenium.webdriver import ChromeService

    options = ChromeOptions()
    options.binary_location = subprocess.run(['which', 'vivaldi'], stdout=subprocess.PIPE).stdout.decode('utf-8').strip()
    print(options.binary_location)
    driverPATH =  './drivers/chromedriver'

    drivervivaldi = webdriver.Chrome(service=ChromeService(driverPATH), options=options)
    return drivervivaldi

def GetDriverFirefox():
    """Firefox"""
    from selenium import webdriver
    from selenium.webdriver.firefox.options import Options as FirefoxOptions
    from selenium.webdriver.firefox.service import Service as FirefoxService

    options = FirefoxOptions()
    options.binary_location = subprocess.run(['which', 'firefox'], stdout=subprocess.PIPE).stdout.decode('utf-8').strip()
    driverPATH = subprocess.run(['which', 'geckodriver'], stdout=subprocess.PIPE).stdout.decode('utf-8').strip()
    print(driverPATH)
    driverFirefox = webdriver.Firefox(service=FirefoxService(driverPATH), options=options)
    return driverFirefox

DRIVER = GetDriverEdge()