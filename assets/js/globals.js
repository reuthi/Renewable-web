let properties = []
let posts = []
let USERNAME = null

let localStorageKey = {
    jwt: "renewableJwt",
    username: "renewableUsername"
}

const propertyDetailsKeys = {
    'typeOfTerrain': 'Type of terrain',
    'shading': 'Shading',
    'typeOfSale': 'Type of sale',
    'PPAOfftakerType': 'PPA offtaker type',
    'PPAinPlace': 'PPA in place',
    'surfaceRightsInAgreement': 'Surface rights in agreement',
    'surfaceOwner': 'Surface owner',
    'areaCovered': 'Area covered',
    'usesOfSurface': 'Uses of surface',
    'ComissioningDate': 'Comissioning date',
    'surfaceMaterial': 'Surface material',
    'amountOfSurfaces': 'Amount of surfaces',
    'PPADuration': 'PPA duration',
    'ConstructionDate': 'Construction date'
}
const users = [] // TODO
const apiUrl = 'http://localhost:1337'
const APIKEY = 'AIzaSyB8n_A68NSAQdSQ_Qd7L5r0hfteOUFwlUY'