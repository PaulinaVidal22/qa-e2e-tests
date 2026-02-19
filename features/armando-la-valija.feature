Feature: Armando la valija - Compra de artículos de playa

  Como usuario
  Quiero buscar artículos de playa
  Para agregarlos al carrito y validar el total de compra

  Background:
    Given el usuario ingresa a la tienda online de Sodimac

  @smoke @e2e
  Scenario: Agregar dos productos distintos y validar el carrito

    When el usuario busca artículos de playa
    * selecciona el primer producto disponible
    * lo agrega al carrito
    * regresa al listado de productos
    * selecciona un segundo producto distinto
    * lo agrega al carrito
    * navega al carrito de compras

    Then el carrito debe contener ambos productos seleccionados
    * cada producto debe tener cantidad 1
    * el precio total debe ser consistente con precios y cantidades
    * se captura una evidencia del detalle del carrito
