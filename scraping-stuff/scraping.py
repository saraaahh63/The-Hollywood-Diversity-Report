import requests
from bs4 import BeautifulSoup
from pprint import pprint
import json

html = requests.get('https://en.wikipedia.org/wiki/List_of_American_films_of_2009')

a = BeautifulSoup(html.text, 'lxml')
# print(b.prettify())

table = a.find('table',{'class':'wikitable sortable'})

# obj = {
#     "title": ,
#     "director": ,
#     "cast": ,
#     "genre": ,
#     "company": ,
#     "year": ,
# }

links2009 = table.findAll('tr')
data = []
for rows in links2009[1:]:
    cells = rows.findAll('td')
    movie = str(cells[0].find('a').contents[0])
    director = cells[1].get_text()
    cast = cells[2].get_text()
    genre = cells[3].get_text()
    company = cells[4].get_text()

    director = director.replace('\n', '').replace('\r', '')
    cast = cast.replace('\n', '').replace('\r', '')
    genre = genre.replace('\n', '').replace('\r', '')
    company = company.replace('\n', '').replace('\r', '')

    obj = dict()
    obj["movie"] = movie
    obj["director"] = director
    obj["cast"] = cast
    obj["genre"] = genre
    obj["company"] = company
    obj["year"] = '2009'

    data.append(obj)

html = requests.get('https://en.wikipedia.org/wiki/List_of_American_films_of_2010')

b = BeautifulSoup(html.text, 'lxml')

table = b.find('table',{'class':'wikitable sortable'})

links2010 = table.findAll('tr')
for rows in links2010[1:]:
    cells = rows.findAll('td')
    movie = str(cells[0].find('a').contents[0])
    director = cells[1].get_text()
    cast = cells[2].get_text()
    genre = cells[3].get_text()
    company = cells[4].get_text()

    director = director.replace('\n', '').replace('\r', '')
    cast = cast.replace('\n', '').replace('\r', '')
    genre = genre.replace('\n', '').replace('\r', '')
    company = company.replace('\n', '').replace('\r', '')

    obj = dict()
    obj["movie"] = movie
    obj["director"] = director
    obj["cast"] = cast
    obj["genre"] = genre
    obj["company"] = company
    obj["year"] = '2010'

    data.append(obj)
    
html = requests.get('https://en.wikipedia.org/wiki/List_of_American_films_of_2011')

c = BeautifulSoup(html.text, 'lxml')

table = c.find('table',{'class':'wikitable sortable'})

links2011 = table.findAll('tr')
for rows in links2011[1:]:
    cells = rows.findAll('td')
    movie = str(cells[0].find('a').contents[0])
    director = cells[1].get_text()
    cast = cells[2].get_text()
    genre = cells[3].get_text()
    company = cells[4].get_text()

    director = director.replace('\n', '').replace('\r', '')
    cast = cast.replace('\n', '').replace('\r', '')
    genre = genre.replace('\n', '').replace('\r', '')
    company = company.replace('\n', '').replace('\r', '')

    obj = dict()
    obj["movie"] = movie
    obj["director"] = director
    obj["cast"] = cast
    obj["genre"] = genre
    obj["company"] = company
    obj["year"] = '2011'

    data.append(obj)

html = requests.get('https://en.wikipedia.org/wiki/List_of_American_films_of_2012')

d = BeautifulSoup(html.text, 'lxml')

table = d.find('table',{'class':'wikitable sortable'})

links2012 = table.findAll('tr')
for rows in links2012[1:]:
    cells = rows.findAll('td')
    movie = str(cells[0].find('a').contents[0])
    director = cells[1].get_text()
    cast = cells[2].get_text()
    genre = cells[3].get_text()
    company = cells[4].get_text()

    director = director.replace('\n', '').replace('\r', '')
    cast = cast.replace('\n', '').replace('\r', '')
    genre = genre.replace('\n', '').replace('\r', '')
    company = company.replace('\n', '').replace('\r', '')

    obj = dict()
    obj["movie"] = movie
    obj["director"] = director
    obj["cast"] = cast
    obj["genre"] = genre
    obj["company"] = company
    obj["year"] = '2012'

    data.append(obj)

html = requests.get('https://en.wikipedia.org/wiki/List_of_American_films_of_2013')

e = BeautifulSoup(html.text, 'lxml')

table = e.find('table',{'class':'wikitable sortable'})

links2013 = table.findAll('tr')
for rows in links2013[1:]:
    cells = rows.findAll('td')
    movie = str(cells[0].find('a').contents[0])
    director = cells[1].get_text()
    cast = cells[2].get_text()
    genre = cells[3].get_text()
    company = cells[4].get_text()

    director = director.replace('\n', '').replace('\r', '')
    cast = cast.replace('\n', '').replace('\r', '')
    genre = genre.replace('\n', '').replace('\r', '')
    company = company.replace('\n', '').replace('\r', '')

    obj = dict()
    obj["movie"] = movie
    obj["director"] = director
    obj["cast"] = cast
    obj["genre"] = genre
    obj["company"] = company
    obj["year"] = "2013"

    data.append(obj)

html = requests.get('https://en.wikipedia.org/wiki/List_of_American_films_of_2014')

f = BeautifulSoup(html.text, 'lxml')

table = f.find('table',{'class':'wikitable sortable'})

links2014 = table.findAll('tbody')
for rows in links2014[1:]:
    cells = rows.findAll('td')
    movie = str(cells[2].find('a').contents[0])
    director = cells[3].get_text()
    cast = cells[4].get_text()
    genre = cells[5].get_text()
    company = cells[6].get_text()

    director = director.replace('\n', '').replace('\r', '')
    cast = cast.replace('\n', '').replace('\r', '')
    genre = genre.replace('\n', '').replace('\r', '')
    company = company.replace('\n', '').replace('\r', '')

    obj = dict()
    obj["movie"] = movie
    obj["director"] = director
    obj["cast"] = cast
    obj["genre"] = genre
    obj["company"] = company
    obj["year"] = "2014"

    data.append(obj)


print(data[-1])

with open('data.json', 'w') as fp:
    json.dump(data, fp,  indent=4)