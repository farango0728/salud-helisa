# Proyecto Helisa Salud

Una entidad de salud desea tener un registro de cada uno de los actores que intervienen en el
proceso de prestación de servicios

---
## Requerimientos

Para el desarrollo, solo necesitará Node.js y un paquete global de nodo, npm, instalado en su entorno.

### Node
- #### Node instalacion en widows

  simplemente [official Node.js website](https://nodejs.org/) y descargue el instalador.
Además, asegúrese de tener `git` disponible en su PATH,` npm` podría necesitarlo (puede encontrar (git [here](https://git-scm.com/)).

- #### Node instalacion en Ubuntu

  Puede instalar nodejs y npm fácilmente con apt install, simplemente ejecute los siguientes comandos..

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Otros sistemas operativos
  Puede encontrar más información sobre la instalación en el [official Node.js website](https://nodejs.org/) y ene [official NPM website](https://npmjs.org/).

Si la instalación fue exitosa, debería poder ejecutar el siguiente comando.

    $ node --version
    v

    $ npm --version
    v

Si necesita actualizar `npm`, puede hacerlo usando`
    $ npm install npm -g

---

## Instalacion

    $ https://github.com/farango0728/salud-helisa.git
    $ cd salud-helisa
    $ npm install

## Configure app

Crear el archivo .env y configurar las siguientes variables

- #### PPName = 
- #### DBDriver = 
- #### DBHost = 
- #### DBUser = 
- #### DBName = 
- #### DBPassword = 

## Ejecutar en Desarrollo

    $ npm run dev

## Ejecutar en Produccion

    $ npm run build
    
## Ejecutar en Test

    $ npm run test

