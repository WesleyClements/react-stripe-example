import CheckoutForm from "./components/CheckoutForm";

import "./App.css";

const products = [
  {
    _id: "oihjwqoreiuqoiueroi",
    name: "T-Shirt",
  },
  {
    _id: "oihjwqoreiuqoiueroi",
    name: "Sweater",
  }
]

export default function App() {
  return (
    <div className="App">
        <CheckoutForm products={products}/>
    </div>
  );
}
