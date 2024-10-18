// components/how-it-works.js
const steps = [
    { title: "Submit Your Claim", description: "Enter your claim details into our secure platform." },
    { title: "AI Analysis", description: "Our AI analyzes your claim using vast amounts of data and legal precedents." },
    { title: "Expert Review", description: "Our insurance professionals review the AI's findings." },
    { title: "Receive Your Estimate", description: "Get a detailed report with your optimized claim estimate." }
  ];
  
  export default function HowItWorks() {
    return (
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-start">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 text-center px-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }