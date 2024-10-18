// components/features.js
const features = [
    {
      title: "AI-Powered Analysis",
      description: "Our advanced algorithms analyze your claim details to maximize your potential settlement.",
      icon: "📊"
    },
    {
      title: "Expert Support",
      description: "Get personalized assistance from our team of experienced insurance professionals.",
      icon: "👥"
    },
    {
      title: "Fast Turnaround",
      description: "Receive your optimized claim estimate in minutes, not days or weeks.",
      icon: "⚡"
    }
  ];
  
  export default function Features() {
    return (
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose SettleBot.ai</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }