import React from 'react'

const steps = [
    {
      id: "Step 1",
      name: "Information",
    },
    {
      id: "Step 2",
      name: "Address",
      fields: ["city", "street"],
    },
    { id: "Step 3", name: "Complete" },
  ];

const Steps = ( { currentStep }:any ) => {
  return (
    <>
        <nav
        aria-label="Progress"
        className="flex items-center w-full justify-center max-w-[770px]"
      >
        <ol
          role="list"
          className="space-y-0 md:flex w-3/4 TestP [&>*:first-child]:flex-row  [&>*:last-child]:flex-row-reverse"
        >
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-auto ml-0 w-full ">
              {currentStep > index ? (
                <div className="flex flex-row w-full items-center text-[#DCDCDC] after:content-[''] after:w-full after:h-1 after:border-b after:border-[#42E083]  after:border-4 after:inline-block ">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#53545C] rounded-full border-[#42E083] border-4 lg:h-12 lg:w-12  shrink-0">                    
                  </span>
                </div>
              ) : currentStep === index ? (
                <div className="flex flex-row w-full items-center text-[#DCDCDC]  after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block after:border-[#DCDCDC]">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#53545C] rounded-full border-[#42E083] border-4 lg:h-12 lg:w-12  shrink-0">                    
                  </span>
                </div>
              ) : (
                <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b  after:border-[#DCDCDC] after:border-4 after:inline-block text-[#DCDCDC]">
                  <div className="border-[#DCDCDC] border-4  flex items-center justify-center w-10 h-10 bg-transparent rounded-full lg:h-12 lg:w-12  shrink-0"></div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

export default Steps;
