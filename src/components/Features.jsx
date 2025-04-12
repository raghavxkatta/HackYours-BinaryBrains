const Features = () => {
  const features = [
    {
      title: 'Easy to Use',
      description: 'Our platform is designed with simplicity in mind, making it accessible for everyone.',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Powerful Features',
      description: 'Access a wide range of powerful tools and features to enhance your experience.',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: '24/7 Support',
      description: 'Our dedicated support team is always here to help you whenever you need assistance.',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent sm:text-4xl">
            Key Features
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to succeed in one place
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="absolute -top-4 left-4">
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features