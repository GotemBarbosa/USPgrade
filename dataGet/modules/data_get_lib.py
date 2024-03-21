"""
This file has functions to scrap subjects information
"""


from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.common.by import By
import time
import json


class element_has_content(object):
  def __init__(self, locator):
    self.locator = locator

  def __call__(self, driver):
    element = driver.find_element(*self.locator)   # Encontrar o elemento referido
    if element.text != "":
      return element
    else:
      return False


def GetTable(driver):
    link = "https://uspdigital.usp.br/jupiterweb/jupCarreira.jsp?codmnu=8275" # link da informacoes de diciplinas usp
    driver.get(link)

    #Preenchimento de formulario para ter as informacoes depois:
    unidade = WebDriverWait(driver, 20).until(expected_conditions.presence_of_element_located((By.ID, 'comboUnidade')))
    selectUnidade = Select(unidade)
    selectUnidade.select_by_visible_text("Instituto de Ciências Matemáticas e de Computação - ( ICMC )")

    #Depois precisa esperar que o campO Option esteja carregado para eu poder seleciona-lo
    WebDriverWait(driver, 20).until(expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, "#comboCurso option")))
    curso = driver.find_element(By.ID,'comboCurso')
    selectCurso = Select(curso)
    selectCurso.select_by_visible_text("Bacharelado em Ciências de Computação - integral")

    botaoEnviar = driver.find_element(By.ID,"enviar")
    botaoEnviar.click();
    
    #esperar a guia superior ficar disponivel
    time.sleep(10);
    botaoGradeCurricular = driver.find_element(By.ID, 'step4-tab')
    botaoGradeCurricular.click()

    # Encontre todas as tabelas dentro do div com id=gradeCurricular
    tables = driver.find_elements(By.CSS_SELECTOR, "#gradeCurricular table")
    return tables

def GetSubjectlist(tables, driver):
    Subjectlist = []; #lista das materias

    # valores que serao os mesmos para todos
    course = "Ciência da Computação"
    institute = "Instituto de Ciências Matemáticas e de Computação - ( ICMC )"

    for table in tables:
        #extrair as linhas da tabela
        rows = table.find_elements(By.TAG_NAME, "tr")


        #Na primeira linha de cada materia temos o tipo de obrigatoriedade da cada materia
        subjectType = rows[0].find_elements(By.TAG_NAME, "td")[0].text


        #iterar sobre as linhas e extrair as células
        for row in rows[1:]:

            #objeto que vai ser adicionado na lista de materias (seguindo o padrao do dataModel.json )
            subject = {
                "Subject": None,
                "Code": None,
                "Course": None,
                "Type": None,
                "Link": None,
                "Semester": None,
                "Institute": None,
                "Credits":{
                    "Class": None,
                    "Work": None,
                    "Total": None
                },
                "About":{
                    "Goal": None,
                    "Summary": None,
                    "Program": None,
                },
                "LinkWith":{
                    "Requirements":[],
                    "RequirementOf":[],
                    "Recomendations":[]
                }
            }
            #extrair as celulas da linha
            cells = row.find_elements(By.TAG_NAME, "td")

            #Se a linha tiver esse estilo, significa que ela representa um semestre
            if(row.get_attribute("style") == "background-color: rgb(204, 204, 204);"):
                semester = cells[0].text
            else:
                #Se a linha tiver esse estilo, significa que a linha represente um requisito ou recomendacao de uma materia anterior 
                if(cells[0].get_attribute("style") == "padding-left: 25px;"):
                    if(cells[1].text == "Indicação de conjunto"):
                        #objeto recomendation
                        recomendation = {
                            "Code": None,
                            "Subject": None,
                            "Link": None,
                        }
                        code = cells[0].text.split(' ')[0]
                        recomendation["Link"] = f"https://uspdigital.usp.br/jupiterweb/obterDisciplina?sgldis={code}&verdis=1"
                        recomendation["Code"] = code
                        recomendation["Subject"] = ' '.join(cells[0].text.split(' ')[2:])


                        Subjectlist[-1]["LinkWith"]["Recomendations"].append(recomendation)

                    else:
                        #objeto requirement que vai ser adicionado na lista de requisitos da materia anterior (seguindo o padrao do dataModel.json )
                        requirement = {
                            "Code": None,
                            "Subject": None,
                            "Link": None,
                            "type": None
                        }

                        code = cells[0].text.split(' ')[0]
                        requirement["Code"] = code
                        requirement["Subject"] = ' '.join(cells[0].text.split(' ')[2:])
                        requirement["Link"] = f"https://uspdigital.usp.br/jupiterweb/obterDisciplina?sgldis={code}&verdis=1"
                        requirement["type"] = cells[1].text
                        Subjectlist[-1]["LinkWith"]["Requirements"].append(requirement)
                else:

                #Nova materia
                    code = cells[0].text
                    name = cells[1].text 
                    creditClass = cells[2].text
                    creditWork = cells[3].text if len(cells) > 3 else None
                    classHours = cells[4].text if len(cells) > 4 else None
                    ce = cells[5].text if len(cells) > 5 else None # nao usada
                    cp = cells[6].text if len(cells) > 6 else None #nao usada
                    atpa = cells[7].text if len(cells) > 7 else None #nao usada


                    subject["Subject"] = name
                    subject["Code"] = code
                    subject["Course"] = course
                    subject["Institute"] = institute
                    subject["Type"] = subjectType
                    subject["Semester"] = semester
                    subject["Link"] = f"https://uspdigital.usp.br/jupiterweb/obterDisciplina?sgldis={code}&verdis=1"
                    subject["Credits"]["Class"] = creditClass
                    subject["Credits"]["Work"] = creditWork
                    subject["Credits"]["Total"] = classHours
                    
                    time.sleep(0.1)
                    #abrir o dialog que contem as informacoes da materia ao clicar no codigo da materia
                    link = cells[0].find_element(By.TAG_NAME, "a")
                    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", link)
                    time.sleep(0.1)
                    link.click()

                    #pegar as informacoes contidas no dialog
                    dialog = WebDriverWait(driver, 20).until(expected_conditions.presence_of_element_located((By.ID, 'disciplinaDialog')))
                    goal = dialog.find_element(By.CLASS_NAME, 'objetivos').get_attribute('innerHTML')
                    summary = dialog.find_element(By.CLASS_NAME, 'programaResumido').get_attribute('innerHTML')
                    program = dialog.find_element(By.CLASS_NAME, 'programa').get_attribute('innerHTML')

                    subject["About"]["Goal"] = goal
                    subject["About"]["Summary"] = summary
                    subject["About"]["Program"] = program

                    # fechar o dialog
                    closeLink = WebDriverWait(driver, 20).until(expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, 'a[role="button"]')))
                    closeLink.click()
                    WebDriverWait(driver, 0.5)

                    #Adicionar a nova materia na lista de materias
                    Subjectlist.append(subject)
    return Subjectlist

def SetRequirementsOf(Subjectlist):
    """ Registrar os RequirementOf"""
    # Itero por todas as matérias
    for mainSubject in Subjectlist:
        dependencies = []

        # Registro todas as dependencias em dependencies
        for virtualDependency in mainSubject['LinkWith']['Requirements']:
            dependencies.append({
                    "Code" : virtualDependency['Code'],
                    "type" : virtualDependency['type'],
                    "Dict" : None
                })

        # Acho as dependencias no SubjectList e coloca na parte Dict delas
        for dependency in dependencies:
            for possibleSubject in Subjectlist:
                if possibleSubject['Code'] == dependency['Code']:
                    dependency['Dict'] = possibleSubject


        # Registro no Dict que a matéria é dependencia da mainSubject
        for dependecy in dependencies:
            if dependecy['Dict'] == None: continue

            dependency['Dict']['LinkWith']['RequirementOf'].append({
                    "Code": mainSubject['Code'],
                    "Subject":  mainSubject['Subject'],
                    "Link": mainSubject['Link'],
                    "type": dependency['type'],
                })
    return Subjectlist

def SaveData(Subjectlist, path):
    #converter lista gerada para json e salvar em um arquivo
    with open(path, 'w', encoding='utf8') as f:
        json.dump(Subjectlist, f, ensure_ascii=False, indent=2)

def GetData(driver, path):
    tables = GetTable(driver)
    time.sleep(2)
    Subjectlist = GetSubjectlist(tables, driver)
    Subjectlist = SetRequirementsOf(Subjectlist)

    SaveData(Subjectlist, path)