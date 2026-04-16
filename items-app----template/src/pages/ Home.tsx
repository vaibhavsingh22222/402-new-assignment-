export default function Home() {
  const featuredItems = [
    { id: 1, name: "Wooden Chair", location: "Coventry", category: "Furniture" },
    { id: 2, name: "Study Desk", location: "Birmingham", category: "Furniture" },
    { id: 3, name: "Winter Jacket", location: "Wolverhampton", category: "Clothing" },
  ];

  return (
    <div className="bg-gradient-to-b from-[#ecfdf5] to-white min-h-screen">

      {/* HERO */}
      <section className="text-center py-28 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-900 mb-6">
          Build a Greener Community 🌍
        </h1>

        <p className="text-lg text-green-700 max-w-2xl mx-auto mb-10">
          Share items, reduce waste, and connect with people in your area.
        </p>

        <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl font-semibold shadow-md transition">
          Explore Items
        </button>
      </section>

      {/* FEATURES */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-bold text-green-900 mb-3">♻️ Share Items</h3>
            <p className="text-green-700 text-sm">
              List items you no longer need and help others reuse.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-bold text-green-900 mb-3">🤝 Connect Locally</h3>
            <p className="text-green-700 text-sm">
              Meet people nearby and build a stronger community.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-bold text-green-900 mb-3">🌱 Reduce Waste</h3>
            <p className="text-green-700 text-sm">
              Make sustainable choices together.
            </p>
          </div>

        </div>
      </section>

      {/* 🔥 FEATURED ITEMS */}
      <section className="px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl font-bold text-green-900 mb-10 text-center">
            Featured Items
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-green-700">
                  📍 {item.location}
                </p>
                <p className="text-sm text-green-600">
                  Category: {item.category}
                </p>

                <button className="mt-4 text-green-600 font-semibold hover:underline">
                  View Details →
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}