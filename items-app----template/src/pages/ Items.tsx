import { Link } from "react-router-dom"
import type { Item } from "../types/item"

const items: Item[] = [
  { id: 1, name: "Laptop", description: "Portable computer", price: 1200 },
  { id: 2, name: "Phone", description: "Smartphone", price: 800 },
  { id: 3, name: "Keyboard", description: "Mechanical keyboard", price: 120 }
]

export default function Items() {
  return (
    <div className="min-h-screen bg-emerald-50 px-6 py-12">

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-emerald-900">
          Items
        </h1>
        <p className="text-emerald-600 mt-2">
          Browse available products below
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {items.map(item => (
          <Link
            key={item.id}
            to={`/items/${item.id}`}
            className="group"
          >
            <div className="bg-white/70 border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

              {/* Name */}
              <h2 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-700 transition">
                {item.name}
              </h2>

              {/* Description */}
              <p className="text-emerald-600 text-sm mt-2">
                {item.description}
              </p>

              {/* Price */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-emerald-800 font-bold">
                  £{item.price}
                </span>

                <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                  View →
                </span>
              </div>

            </div>
          </Link>
        ))}

      </div>

    </div>
  )
}