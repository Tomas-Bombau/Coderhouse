const fs = require("fs")


class ProductManager {
    constructor(path) {
      this.products = [];
      this.path = path
      fs.promises.writeFile(this.path, "[]")
    }
    #idBase = 0

    async addProduct(title, description, price = "", thumbnail, code, stock = "") {
      try {
          await this.getProducts();
  
          const incrementarId = () => {
              this.#idBase += 1;
              return this.#idBase;
          };
  
          const findCode = this.products.find(producto => producto.code === code);
  
          if (!title || !description || !price || !thumbnail || !code || !stock) {
              console.log("Debe completar todos los campos requeridos");
              return;
          } else if (findCode) {
              console.log("Ese code ya existe. Intente con otro code.");
              return;
          } else {
              const producto = {
                  title,
                  description,
                  price,
                  thumbnail,
                  code,
                  stock,
                  id: incrementarId(),
              };

              this.products.push(producto);

              const dataToRegister = JSON.stringify(this.products, null, "\t");
              await fs.promises.writeFile(this.path, dataToRegister);
        }
      } catch (error) {
          console.log(error);
      }
  }
       
  
  getProducts = async () => {
      try {
        const readingFile = await fs.promises.readFile(this.path)
        const existingProducts = JSON.parse(readingFile)
        this.products.push(...existingProducts)
        return this.products
      } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        console.log(error);
          return []; 
      }
}

  
    getProductsById = async (id) => {
      try {
        await this.getProducts();
        const findProductId = this.products.find(producto => producto.id === id)
        if(!findProductId){
          console.log("Not found")
        } else {
          return findProductId
        }
      } catch (error) {
        throw new Error (error)
      }
    }

    deleteProduct = async (id) => {
      try {
        await this.getProducts();
        const findProductId = this.products.find(producto => producto.id === id)
        let index = this.products.indexOf(findProductId)
        this.products.splice(index,1)
        const productDeleted = JSON.stringify(this.products, null, "\t");
        await fs.promises.writeFile(this.path, productDeleted);
    } catch (error){
        throw new Error (error)
    }
  }

  updateProductById = async (id, data) => {
    try {
      await this.getProducts();
      let findProductId = this.products.find(producto => producto.id === id)
      if(!findProductId){
        console.log("Not found")
      } else {
        const index = this.products.indexOf(findProductId);
        findProductId = {...findProductId, ...data}
        if (index !== -1) {
          this.products[index] = findProductId;
        }
        const productModified = JSON.stringify(this.products, null, "\t");
        await fs.promises.writeFile(this.path, productModified);
        return findProductId
      }
    } catch (error) {
      throw new Error (error)
    }
  }
}
  
  
  

//! Tests async/await - Descomentar para testear
//Crea instancia, crea archivo y agrega dos productos al archivo
  // const productManagerTest = new ProductManager("./productManager.txt")
  // productManagerTest.addProduct("Producto 1", "Es el producto 1", 1000, "url.a.imagen" , "Kjlks1kjJs", 10) // Crea producto 1
  // productManagerTest.addProduct("Producto 2", "Es el producto 2", 2000, "url.a.imagen" , "Kjlks2kjJs", 20) // Crea producto 2

  //Busca en el archivo por ID
  // productManagerTest.getProductsById(1)
  //   .then(product => console.log(product))
  //   .catch(error => console.log(error))

  //Borra del archivo por ID
  // productManagerTest.deleteProduct(1)
  // .then(product => console.log(product))
  // .catch(error => console.log(error))

  // Modifica el producto en el archivo 
  // const dataParaActualizar = {
  //   title: "Producto actualizado",
  //   description: "Producto actualizado",
  //   price: 5000,
  //   thumbnail: "url.a.imagen.actualizada",
  //   code: "Kjlks4kjJsasdasd",
  //   stock: 60,
  // }

  // productManagerTest.updateProductById(1, dataParaActualizar)
  // .then(product => console.log(product))
  // .catch(error => console.log(error))


/* 
  ! Tests - Descomentar para testear
  const productManagerTest = new ProductManager // Nueva instancia
  
  productManagerTest.addProduct("", "Es el producto 1", 1000, "url.a.imagen" , "Kjlks1kjJs", 10) //Error de campos incompletos
  productManagerTest.addProduct("Producto 1", "", 1000, "url.a.imagen" , "Kjlks1kjJs", 10) //Error de campos incompletos
  productManagerTest.addProduct("Producto 1", "Es el producto 1", "", "url.a.imagen" , "Kjlks1kjJs", 10) //Error de campos incompletos
  productManagerTest.addProduct("Producto 1", "Es el producto 1", 1000, "" , "Kjlks1kjJs", 10) //Error de campos incompletos
  productManagerTest.addProduct("Producto 1", "Es el producto 1", 1000, "url.a.imagen" , "", 10) //Error de campos incompletos
  productManagerTest.addProduct("Producto 1", "Es el producto 1", 1000, "url.a.imagen" , "Kjlks1kjJs", "") //Error de campos incompletos
  
  productManagerTest.addProduct("Producto 1", "Es el producto 1", 1000, "url.a.imagen" , "Kjlks1kjJs", 10) // Crea producto 1
  productManagerTest.addProduct("Producto 2", "Es el producto 2", 2000, "url.a.imagen" , "Kjlks2kjJs", 20) // Crea producto 2
  productManagerTest.addProduct("Producto 3", "Es el producto 3", 3000, "url.a.imagen" , "Kjlks3kjJs", 30) // Crea producto 3
  productManagerTest.addProduct("Producto 4", "Es el producto 4", 4000, "url.a.imagen" , "Kjlks4kjJs", 40) // Crea producto 4
  productManagerTest.addProduct("Producto 4", "Es el producto 4", 4000, "url.a.imagen" , "Kjlks4kjJs", 40) // Error de code repetido
  
  console.log(productManagerTest.getProducts()) // Trae todos los productos
  console.log(productManagerTest.getProductsById(1)) // Trae producto id 1
  console.log(productManagerTest.getProductsById(2)) // Trae producto id 2
  console.log(productManagerTest.getProductsById(3)) // Trae producto id 3
  console.log(productManagerTest.getProductsById(4)) // Trae producto id 4
  productManagerTest.getProductsById(5) // Not Found */