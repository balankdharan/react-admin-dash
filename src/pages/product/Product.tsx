import { Link, useParams } from "react-router-dom";
import Single from "../../components/single/Single";
import { singleProduct } from "../../data";
import { useAdminStore } from "../../store/AdminStore";
import "./product.scss";

const Product = () => {
  const { id } = useParams();
  const { data } = useAdminStore();
  const product = data.products.find((row) => row.id === Number(id));

  if (!product) {
    return (
      <div className="product notFound">
        <h1>Product not found</h1>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  const title = String(product.title);

  return (
    <div className="product">
      <Single
        id={product.id}
        img={product.img as string | undefined}
        title={title}
        info={{
          color: product.color,
          price: product.price,
          producer: product.producer,
          added: product.createdAt,
          stock: product.inStock ? "in stock" : "out of stock",
        }}
        chart={singleProduct.chart}
        activities={singleProduct.activities.map((activity) => ({
          ...activity,
          text: activity.text.replace(singleProduct.title, title),
        }))}
      />
    </div>
  );
};

export default Product;
