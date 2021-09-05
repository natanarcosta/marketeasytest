import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/shared/entities/product.entity';
import { Category } from 'src/shared/enums/category.enum';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductsService {
  products: Product[] = [
    new Product('AMD Ryzen 5 3600', 1429.90, Category.CPU, 1, 'https://images.kabum.com.br/produtos/fotos/102438/processador-amd-ryzen-5-3600-cache-32mb-3-6ghz-4-2ghz-max-turbo-am4-100-100000031box_processador-amd-ryzen-5-3600-cache-32mb-3-6ghz-4-2ghz-max-turbo-am4-100-100000031box_1562606710_m.jpg'),
    new Product('AMD Ryzen 7 5800X', 2649.90, Category.CPU, 2, 'https://images.kabum.com.br/produtos/fotos/129459/processador-amd-ryzen-9-5900x-cache-70mb-3-7ghz-4-8ghz-max-turbo-am4-100-100000063wof_1602600708_m.jpg'),
    new Product('Intel Core I5-10400', 1150, Category.CPU, 3, 'https://images.kabum.com.br/produtos/fotos/112990/processador-intel-core-i5-10400-cache-12mb-2-9ghz-lga-1200-bx8070110400_1589200167_m.jpg'),
    new Product('RTX 3060', 5799.90, Category.GPU, 4, 'https://images.kabum.com.br/produtos/fotos/149999/placa-de-video-evga-geforce-rtx-3060-xc-gaming-12gb-gddr6-dualfan-metal-backplate-dlss-ray-tracing-12g-p5-3657-kr_1614167124_m.jpg'),
    new Product('RTX 3080 Ti', 12000, Category.GPU, 5, 'https://images.kabum.com.br/produtos/fotos/164651/aorus-geforce-rtx-3080-ti-xtreme-12g_1622661313_m.jpg'),
    new Product('RX 6900 XT', 10500, Category.GPU, 6, 'https://images.kabum.com.br/produtos/fotos/161148/placa-de-video-msi-radeon-rx-6900-xt-gaming-x-trio-16g-16-gbps-16gb-gddr6-amd-rdna-2-metal-backplate-rgb-mystic-light_1623068939_m.jpg'),
    new Product('Headset Redragon Scylla', 119.90, Category.HEADSET, 7, 'https://images.kabum.com.br/produtos/fotos/93168/93168_1507643786_index_m.jpg'),
    new Product('Headset HyperX Cloud Stinger', 329.90, Category.HEADSET, 8, 'https://images.kabum.com.br/produtos/fotos/81132/81132_index_m.jpg'),
    new Product('Headset Razer Kraken', 1099, Category.HEADSET, 9, 'https://images.kabum.com.br/produtos/fotos/110161/headset-gamer-razer-kraken-ultimate-chroma-usb-drivers-50mm-rz04-03180100-r3u1_1602677445_m.jpg'),
    new Product('Teclado AOC AGK700', 699.90, Category.KEYBOARD, 10, 'https://images.kabum.com.br/produtos/fotos/129234/teclado-mecanico-gamer-aoc-agon-agk700-rgb-switch-cherry-mx-blue-abnt2-agk700d81b_1616434397_m.jpg'),
    new Product('Teclado Multilaser Slim', 30, Category.KEYBOARD, 11,'https://images.kabum.com.br/produtos/fotos/62396/62396_index_m.jpg'),
    new Product('Teclado HyperX Mars RGB', 350, Category.KEYBOARD, 12, 'https://images.kabum.com.br/produtos/fotos/92590/92590_index_m.jpg'),
    new Product('DDR4 RAM Crucial Ballistix 8GB DDR4', 310, Category.MEMORY, 13, 'https://images.kabum.com.br/produtos/fotos/135291/memoria-ram-crucial-ballistix-8gb-ddr4-2666-mhz-cl16-udimm-preto-bl8g26c16u4b_1609871709_m.jpg'),
    new Product('DDR4 RAM Kingston Fury Beast 8GB DDR4', 290, Category.MEMORY, 14, 'https://images.kabum.com.br/produtos/fotos/172320/memoria-kingston-fury-beast-8gb-2666mhz-ddr4-cl16-preto-kf426c16bb-8_1626190855_m.jpg'),
    new Product('DDR4 RAM XPG Gammix D30 16GB', 500, Category.MEMORY, 15, 'https://images.kabum.com.br/produtos/fotos/155567/memoria-xpg-gammix-d30-8gb-3200mhz-ddr4-cl19-ax4u32008g16a-sb30_1622639642_m.jpg'),
    new Product('AOC Hero G/24 144hz', 1599.90, Category.MONITOR, 16, 'https://images.kabum.com.br/produtos/fotos/111160/monitor-gamer-aoc-hero-w-led-23-8-widescreen-fhd-ips-hdmi-displayport-freesync-144hz-1ms-altura-ajustavel-24g2-bk_1585656860_m.jpg'),
    new Product('LG LED 21.5" 22MK400H', 840, Category.MONITOR, 17, 'https://images.kabum.com.br/produtos/fotos/99866/monitor-lg-led-23-8-widescreen-full-hd-ips-hdmi-24mk430h_1547830365_m.jpg'),
    new Product('Acer KA272A', 1149.90, Category.MONITOR, 18, 'https://images.kabum.com.br/produtos/fotos/140682/monitor-gamer-acer-27-ka272a-75hz-1ms-full-hd-hdmi-vga-amd-radeon-freesync-zeroframe-um-hx2aa-a02_1611150079_m.jpg'),
    new Product('Logitech G403 HERO', 200, Category.MOUSE, 19, 'https://images.kabum.com.br/produtos/fotos/102649/mouse-gamer-logitech-g403-hero-16k-rgb-lightsync-16000-dpi_mouse-gamer-logitech-g403-hero-16k-rgb-lightsync-16000-dpi_1563479684_m.jpg'),
    new Product('Redragon Cobra M711', 115, Category.MOUSE, 20, 'https://images.kabum.com.br/produtos/fotos/94555/94555_1516707116_index_m.jpg'),
    new Product('Multilaser Classic Full Black', 13, Category.MOUSE, 21, 'https://images.kabum.com.br/produtos/fotos/128719/mouse-multilaser-classic-box-optico-full-black-mo300-_1601387747_m.jpg'),
    new Product('Kingston A400 240GB', 269, Category.SSD, 22, 'https://images.kabum.com.br/produtos/fotos/85197/85197_index_m.jpg'),
    new Product('XPG S41 TUF 256GB', 310, Category.SSD, 23, 'https://images.kabum.com.br/produtos/fotos/127699/ssd-xpg-s41-tuf-256gb-m-2-pcie-leituras-3500mb-s-gravacoes-1000mb-s-agammixs41-256g-c_1606394865_m.jpg'),
    new Product('Crucial BX500 420GB SATA', 390, Category.SSD, 24, 'https://images.kabum.com.br/produtos/fotos/98545/98545_1537970224_index_m.jpg'),
  ]; 

  createProduct(product: CreateProductDto) {
    product.id = this.products.length + 1;
    const newProduct = new Product(
      product.name,
      product.price,
      product.category,
      product.id,
    );
    return this.products.push(newProduct);
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    const product = this.products.find((product) => product.id == id);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return product;
  }

  getProductsByCategory(category: Category) {
    const products = this.products.filter(
      (product) => product.category === category,
    );
    if (!products.length) {
      throw new NotFoundException('No products found in this category!');
    }
    return products;
  }

  deleteProduct(id: number) {
    const index = this.getProductIndex(id);
    return this.products.splice(index, 1);
  }

  updateProduct(id: number, updatedProduct: CreateProductDto) {
    const index = this.getProductIndex(id);
    this.products[index].category = updatedProduct.category;
    this.products[index].name = updatedProduct.name;
    this.products[index].price = updatedProduct.price;
    return this.getProductById(id);
  }

  getProductIndex(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index < 0) {
      throw new NotFoundException('Product not found!');
    }
    return index;
  }
}
