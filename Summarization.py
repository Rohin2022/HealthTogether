import wikipediaapi

wiki = wikipediaapi.Wikipedia('en')


def getData(inputStr):
    page_py = wiki.page(inputStr)
    if(page_py.exists()):
        return page_py.summary
    return ""
    