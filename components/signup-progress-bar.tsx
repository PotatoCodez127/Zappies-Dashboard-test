"use client"

interface SignupProgressBarProps {
  currentStep: number
}

export function SignupProgressBar({ currentStep }: SignupProgressBarProps) {
  const steps = [
    { number: 1, label: "Account" },
    { number: 2, label: "Personalize" },
    { number: 3, label: "Activate" }, // Updated step 3 label from "Confirm" to "Activate"
  ]

  return (
    <div className="w-full bg-zinc-950 border-b border-zinc-800 py-6">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                    currentStep === step.number
                      ? "bg-violet-600 text-white"
                      : currentStep > step.number
                        ? "bg-violet-600/20 text-violet-400"
                        : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    currentStep === step.number
                      ? "text-violet-400"
                      : currentStep > step.number
                        ? "text-zinc-400"
                        : "text-zinc-600"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-4 mb-6">
                  <div
                    className={`h-full transition-colors ${
                      currentStep > step.number ? "bg-violet-600/40" : "bg-zinc-800"
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
