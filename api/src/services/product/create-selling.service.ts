import prisma from "../../prisma";

interface CreateSellingArgs {
  productItem: { productId: string; qty: number }[];
}

// export const createSellingService = async (body: CreateSellingArgs) => {
//   try {
//     const { productItem } = body;

//     const order = await prisma.$transaction(async (tx) => {
//       await Promise.all(
//         productItem.map(async (item) => {
//           // Temukan produk berdasarkan id
//           const product = await tx.product.findUnique({
//             where: { id: Number(item.productId) },
//           });

//           if (!product) {
//             throw new Error(`Product with ID ${item.productId} not found.`);
//           }

//           if (Number(item.qty) > product.stock) {
//             throw new Error(
//               `Not enough stock for product ${product.name}. Available stock: ${product.stock}, requested: ${item.qty}`
//             );
//           }
//           await tx.product.update({
//             where: { id: Number(item.productId) },
//             data: { stock: product.stock - Number(item.qty) },
//           });
//         })
//       );
//     });

//     return order;
//   } catch (error) {
//     throw error;
//   }
// };

export const createSellingService = async (body: CreateSellingArgs) => {
    try {
      const { productItem } = body;
  
      const order = await prisma.$transaction(async (tx) => {
        await Promise.all(
          productItem.map(async (item) => {
            const product = await tx.product.findUnique({
              where: { id: Number(item.productId) },
            });
  
            if (!product) {
              throw new Error(`Product with ID ${item.productId} not found.`);
            }
  
            // Cek apakah kuantitas yang dijual melebihi stok yang tersedia
            if (Number(item.qty) > product.stock) {
              throw new Error(
                `Not enough stock for product ${product.name}. Available stock: ${product.stock}, requested: ${item.qty}`
              );
            }
  
            console.log(`Stock before: ${product.stock}`);
            console.log(`Qty to deduct: ${Number(item.qty)}`);
  
            // Kurangi stok dengan jumlah yang dijual
            const updatedProduct = await tx.product.update({
              where: { id: Number(item.productId) },
              data: { stock: product.stock - Number(item.qty) },
            });
  
            console.log(`Stock after: ${updatedProduct.stock}`);
          })
        );
      });
  
      return order;
    } catch (error) {
      throw error;
    }
  };
  
