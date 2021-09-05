# marketeasytest

## Instruções:

### Copiar o repositório para máquina local:
Na pasta onde deseja salvar o projeto:
```git clone https://github.com/natanarcosta/marketeasytest```

### Instalando as dependências necessárias:
Nas pastas backend/METstore e frontend/METstore
``` npm install```

### Iniciando o backend no modo desenvolvedor:
Na pasta frontend/METstore:
```npm run start:dev ```

### Iniciando o frontend no modo desenvolvedor:
Na pasta backend/METstore:
``` ng serve ```

## Rotas da API:
### /products
GET: ```http://localhost:3000/products/``` Retorna todos os produtos.

GET: ```http://localhost:3000/products/{id}``` Retorna um produto com determinado ID.

GET ```http://localhost:3000/products/category/{categoria}``` Retorna todos produtos de uma determinada categoria.

POST ```http://localhost:3000/products/``` Cria um produto. Parametros: name (string), price (number), category (enum Category). O ID é gerado automaticamente baseado no length da array de produtos.

PUT ``` http://localhost:3000/products/{id}```  Atualiza os dados do produto associado ao ID informado. Parametros: name (string), price (number) e category ( enum Category).

DELETE: ``` http://localhost:3000/products/{id}```  Deleta o produto associado ao ID informado.

### /orders
GET: ```http://localhost:3000/orders/``` Retorna todos os pedidos.

GET: ```http://localhost:3000/orders/{id}``` Retorna o pedido associado ao ID informado.

POST: ```http://localhost:3000/orders/``` Cria um novo pedido. Parametros: Uma array 'products' contendo id e quantidade de cada produto. Exemplo:

```
{
    "products": [
        {
            "productId" : 3,
            "quantity" : 2
        },
        {
            "productId" : 20,
            "quantity" : 1
        },
        {
            "productId" : 14,
            "quantity" : 2
        },
        {
            "productId" : 6,
            "quantity" : 2
        }
    ]
}
```
O ID é gerado de forma automática e o preço total do pedido é calculado pelo app.

PUT: ```http://localhost:3000/orders/{id}``` Atualiza o pedido associado ao ID informado. Parametros: ID, totalPrice e productList.

DELETE: ```http://localhost:3000/orders/{id}``` Deleta o pedido associado ao ID informado.

### /exchanges

PUT: ```http://localhost:3000/exchanges/{id}``` Efetua a troca de um produto por outro **da mesma categoria**. Parametros: oldProductId e newProductId.



