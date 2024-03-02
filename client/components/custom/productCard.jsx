import { Card } from "../ui/card"

const fakeProduct = {
  name: "Testing",
  description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem vitae saepe repudiandae. Enim consectetur cum, iure dolorem repellat blanditiis id?",
  price: 20,
}


export const ProductCard = ({product=fakeProduct}) => {
  return (
    <Card className="w-80 p-6 h-fit flex flex-col gap-4">
      <div className="w-full aspect-square bg-neutral-800 rounded-md">

      </div>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-3xl">{product.name}</h3>
        <p className="text-3xl">{product.price}$</p>
      </div>
      <p>{product.description}</p>
    </Card>
  )
}
