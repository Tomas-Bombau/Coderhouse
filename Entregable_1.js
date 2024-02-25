class ProductManager {

  constructor() {
    this.products = [];
  }

  #idBase = 0

  addProduct(title, description, price="", thumbnail, code, stock="") {

    const incrementarId = () => {
      this.#idBase += 1
      return this.#idBase;
    };

    const findCode = this.products?.find(producto => producto.code === code)
     
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Debe completar todos los campos requeridos");
      return
    } else if (findCode) {
      console.log("Ese code ya existe. Intente con otro code.");
      return
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

      this.products.push(producto)
    }
  }

  getProducts = () => {
    return this.products
  }

  getProductsById = (id) => {
    const findProductId = this.products.find(producto => producto.id === id)
    if(!findProductId){
      console.log("Not found")
    } else {
      return (findProductId)
    }
  }
}



// ! Tests

// const productManagerTest = new ProductManager // Nueva instancia

// productManagerTest.addProduct("", "Es el producto 1", 1000, "url.a.imagen" , "Kjlks1kjJs", 10) //Error de campos incompletos
// productManagerTest.addProduct("Producto 1", "", 1000, "url.a.imagen" , "Kjlks1kjJs", 10) //Error de campos incompletos
// productManagerTest.addProduct("Producto 1", "Es el producto 1", "", "url.a.imagen" , "Kjlks1kjJs", 10) //Error de campos incompletos
// productManagerTest.addProduct("Producto 1", "Es el producto 1", 1000, "" , "Kjlks1kjJs", 10) //Error de campos incompletos
// productManagerTest.addProduct("Producto 1", "Es el producto 1", 1000, "url.a.imagen" , "", 10) //Error de campos incompletos
// productManagerTest.addProduct("Producto 1", "Es el producto 1", 1000, "url.a.imagen" , "Kjlks1kjJs", "") //Error de campos incompletos

// productManagerTest.addProduct("Producto 1", "Es el producto 1", 1000, "url.a.imagen" , "Kjlks1kjJs", 10) // Crea producto 1
// productManagerTest.addProduct("Producto 2", "Es el producto 2", 2000, "url.a.imagen" , "Kjlks2kjJs", 20) // Crea producto 2
// productManagerTest.addProduct("Producto 3", "Es el producto 3", 3000, "url.a.imagen" , "Kjlks3kjJs", 30) // Crea producto 3
// productManagerTest.addProduct("Producto 4", "Es el producto 4", 4000, "url.a.imagen" , "Kjlks4kjJs", 40) // Crea producto 4
// productManagerTest.addProduct("Producto 4", "Es el producto 4", 4000, "url.a.imagen" , "Kjlks4kjJs", 40) // Error de code repetido

// console.log(productManagerTest.getProducts()) // Trae todos los productos
// console.log(productManagerTest.getProductsById(1)) // Trae producto id 1
// console.log(productManagerTest.getProductsById(2)) // Trae producto id 2
// console.log(productManagerTest.getProductsById(3)) // Trae producto id 3
// console.log(productManagerTest.getProductsById(4)) // Trae producto id 4
// productManagerTest.getProductsById(5) // Not Found