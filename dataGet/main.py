from modules import config, data_get_lib

def main():
    data_get_lib.GetData(config.DRIVER, path="../data/subjects.json")

if __name__ == "__main__":
    main()