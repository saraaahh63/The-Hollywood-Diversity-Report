import requests
from bs4 import BeautifulSoup
from pprint import pprint
import json


html = requests.get('https://en.wikipedia.org/wiki/List_of_American_films_of_2014')

f = BeautifulSoup(html.text, 'lxml')

table = f.findAll(class_='wikitable sortable')
print(table[1])

# links2014 = table.findAll('tr')
# data = []
# for rows in links2014[2:]:
#     cells = rows.findAll('td')
#     movie = cells[0].get_text()
#     director = cells[1].get_text()
#     cast = cells[2].get_text(separator=", ")
#     genre = cells[3].get_text()
#     company = cells[4].get_text()

#     movie = movie.replace('\n', '').replace('\r', '')
#     director = director.replace('\n', '').replace('\r', '').replace('\u00e1','a').replace('\u00f3','o')
#     cast = cast.replace('\n', '').replace('\r', '').replace('\u00eb','e').replace('\u00f6','o')
#     genre = genre.replace('\n', '').replace('\r', '')
#     company = company.replace('\n', '').replace('\r', '')

#     obj = dict()
#     obj["movie"] = movie
#     obj["director"] = director
#     obj["cast"] = cast
#     obj["genre"] = genre
#     obj["company"] = company
#     obj["year"] = "2014"

#     data.append(obj)


# print(data[0])

# with open('data1.json', 'w') as fp:
#     json.dump(data, fp,  indent=4)