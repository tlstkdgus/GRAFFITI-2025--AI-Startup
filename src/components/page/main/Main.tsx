import React, { useState, useEffect } from "react";
import {
  Play,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Eye,
  Zap,
  Brain,
  Target,
  TrendingUp,
} from "lucide-react";

// Type definitions
interface TissueData {
  density: number;
  resistance: number;
  elasticity: number;
  bloodVessels: number;
  nerveDepth: number;
}

interface AIAnalysis {
  successProbability: number;
  optimalVolume: number;
  injectionAngle: number;
  estimatedDuration: number;
  riskFactors: string[];
  recommendations: string[];
}

interface PredictedSpread {
  primary: number;
  secondary: number;
  coverage: number;
}

const Main: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [tissueData, setTissueData] = useState<TissueData | null>(null);
  const [needlePosition, setNeedlePosition] = useState({ x: 50, y: 50 });
  const [predictedSpread, setPredictedSpread] =
    useState<PredictedSpread | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [patientData] = useState({
    age: 45,
    weight: 70,
    gender: "male",
    bmi: 24.5,
    procedure: "Shoulder Surgery",
  });

  // 시뮬레이션 데이터
  const simulateUltrasoundScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setTissueData({
        density: Math.random() * 100,
        resistance: Math.random() * 100,
        elasticity: Math.random() * 100,
        bloodVessels: Math.floor(Math.random() * 5) + 1,
        nerveDepth: Math.random() * 30 + 10,
      });
      setIsScanning(false);
    }, 3000);
  };

  const simulateNeedleInsertion = () => {
    if (currentStep >= 3) {
      // Animate needle insertion
      const insertionSteps = [
        { x: 15, y: 10 }, // Entry point
        { x: 18, y: 15 }, // Through skin
        { x: 20, y: 22 }, // Through fat layer
        { x: 22, y: 30 }, // Approaching nerve
        { x: 24, y: 35 }, // Contact with nerve
      ];

      insertionSteps.forEach((position, index) => {
        setTimeout(() => {
          setNeedlePosition(position);
        }, index * 800);
      });
    }
  };

  const simulateAIAnalysis = () => {
    // Start needle insertion
    simulateNeedleInsertion();

    setTimeout(() => {
      setAiAnalysis({
        successProbability: 94,
        optimalVolume: 15,
        injectionAngle: 20,
        estimatedDuration: 120,
        riskFactors: ["쇄골하동맥 근접 (2.1mm)", "늑막 5cm 하방"],
        recommendations: [
          "15ml 로피바카인 0.5% 사용 권장",
          "20° 각도로 접근",
          "혈관 접촉 시 즉시 후퇴",
          "분할 주입 (5ml씩 3회) 권장",
        ],
      });

      setPredictedSpread({
        primary: 85,
        secondary: 60,
        coverage: 92,
      });
    }, 3000);
  };

  useEffect(() => {
    if (currentStep === 2 && tissueData) {
      simulateAIAnalysis();
    }
  }, [currentStep, tissueData]);

  const steps = [
    { id: 1, title: "Patient Setup", icon: <Target className="w-5 h-5" /> },
    { id: 2, title: "Tissue Analysis", icon: <Eye className="w-5 h-5" /> },
    { id: 3, title: "AI Processing", icon: <Brain className="w-5 h-5" /> },
    { id: 4, title: "Visualization", icon: <Zap className="w-5 h-5" /> },
    {
      id: 5,
      title: "Decision Support",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetDemo = () => {
    setCurrentStep(1);
    setTissueData(null);
    setAiAnalysis(null);
    setPredictedSpread(null);
    setNeedlePosition({ x: 15, y: 10 });
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AnesthAI Pro
          </h1>
          <p className="text-xl text-gray-600">
            정량적 초음파 기반 국소마취 AI 보조 시스템
          </p>
          <div className="mt-4 inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              MVP v1.0 - 핵심 기능 시연
            </span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {step.icon}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step.id ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Patient Info & Controls */}
          <div className="space-y-6">
            {/* Patient Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                환자 정보
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">연령:</span>
                  <span className="font-medium">{patientData.age}세</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">체중:</span>
                  <span className="font-medium">{patientData.weight}kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">BMI:</span>
                  <span className="font-medium">{patientData.bmi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">수술:</span>
                  <span className="font-medium">{patientData.procedure}</span>
                </div>
              </div>
            </div>

            {/* Control Panel */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                시스템 제어
              </h3>
              <div className="space-y-4">
                {currentStep === 1 && (
                  <button
                    onClick={() => {
                      simulateUltrasoundScan();
                      nextStep();
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>상완신경총 스캔 시작</span>
                  </button>
                )}

                {currentStep === 2 && tissueData && (
                  <button
                    onClick={() => {
                      nextStep();
                      simulateAIAnalysis();
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Target className="w-4 h-4" />
                    <span>바늘 삽입 시작</span>
                  </button>
                )}

                {currentStep > 2 && currentStep < 5 && (
                  <button
                    onClick={nextStep}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>다음 단계</span>
                  </button>
                )}

                {currentStep >= 5 && (
                  <div className="w-full bg-green-100 text-green-800 px-4 py-3 rounded-lg font-medium text-center">
                    <CheckCircle className="w-5 h-5 inline mr-2" />
                    시술 완료
                  </div>
                )}

                <button
                  onClick={resetDemo}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>초기화</span>
                </button>
              </div>
            </div>

            {/* Tissue Analysis Results */}
            {tissueData && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  조직 분석 결과
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">조직 밀도:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${tissueData.density}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {tissueData.density.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">저항도:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${tissueData.resistance}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {tissueData.resistance.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">탄성계수:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${tissueData.elasticity}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {tissueData.elasticity.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">신경 깊이:</span>
                    <span className="font-medium">
                      {tissueData.nerveDepth.toFixed(1)}mm
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Center Panel - Ultrasound Visualization */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              실시간 초음파 영상 (상완신경총 차단)
            </h3>
            <div
              className="relative bg-black rounded-lg overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              {/* Ultrasound Background with realistic noise */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black">
                {/* Ultrasound noise pattern */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(200)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-px h-px bg-gray-400"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5,
                      }}
                    />
                  ))}
                </div>

                {/* Simulated ultrasound scan lines */}
                {isScanning && (
                  <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full h-0.5 bg-green-400 opacity-40 animate-pulse"
                        style={{
                          top: `${i * 6.67}%`,
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Anatomical structures */}
                {tissueData && (
                  <>
                    {/* Skin layer */}
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-gray-500 to-gray-600 opacity-80">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-30" />
                    </div>

                    {/* Subcutaneous fat */}
                    <div className="absolute top-6 left-0 right-0 h-10 bg-gradient-to-b from-yellow-600 to-yellow-700 opacity-60">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-40" />
                    </div>

                    {/* Muscle layer (Scalene muscles) */}
                    <div className="absolute top-16 left-0 right-0 h-20 bg-gradient-to-b from-red-900 to-red-800 opacity-70">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-700 to-transparent opacity-30" />
                      {/* Muscle fiber pattern */}
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-full h-0.5 bg-red-600 opacity-40"
                          style={{ top: `${i * 12.5}%` }}
                        />
                      ))}
                    </div>

                    {/* Brachial Plexus Nerves */}
                    <div className="absolute top-20 left-20 w-24 h-8 bg-yellow-400 opacity-90 rounded-lg">
                      <div className="absolute inset-1 bg-yellow-300 rounded-lg opacity-60" />
                      <div className="absolute top-1 left-1 right-1 h-1 bg-yellow-200 rounded-full" />
                      <div className="absolute bottom-1 left-1 right-1 h-1 bg-yellow-200 rounded-full" />
                      {/* Individual nerve bundles */}
                      <div className="absolute top-2 left-2 w-4 h-1 bg-yellow-200 rounded-full opacity-80" />
                      <div className="absolute top-4 left-4 w-4 h-1 bg-yellow-200 rounded-full opacity-80" />
                      <div className="absolute top-2 right-2 w-4 h-1 bg-yellow-200 rounded-full opacity-80" />
                    </div>

                    {/* Subclavian Artery */}
                    <div className="absolute top-28 right-16 w-4 h-20 bg-red-500 opacity-90 rounded-full">
                      <div className="absolute inset-1 bg-red-400 rounded-full opacity-80" />
                      <div className="absolute inset-2 bg-red-300 rounded-full opacity-60" />
                      {/* Pulsation effect */}
                      <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse opacity-40" />
                    </div>

                    {/* Subclavian Vein */}
                    <div className="absolute top-32 right-28 w-6 h-16 bg-blue-600 opacity-80 rounded-full">
                      <div className="absolute inset-1 bg-blue-500 rounded-full opacity-70" />
                      <div className="absolute inset-2 bg-blue-400 rounded-full opacity-50" />
                    </div>

                    {/* First Rib bone structure */}
                    <div className="absolute bottom-8 left-0 right-0 h-4 bg-white opacity-90">
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white" />
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200" />
                    </div>

                    {/* Pleura */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-400 opacity-60">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-300" />
                    </div>
                  </>
                )}

                {/* Needle insertion animation */}
                {currentStep >= 3 && (
                  <>
                    {/* Needle shaft */}
                    <div
                      className="absolute bg-gradient-to-r from-gray-300 to-white opacity-95 transition-all duration-1000 rounded-full"
                      style={{
                        left: `${needlePosition.x - 1}%`,
                        top: `${Math.max(0, needlePosition.y - 25)}%`,
                        width: "3px",
                        height: `${Math.min(50, needlePosition.y + 25)}%`,
                        transform: "rotate(20deg)",
                        transformOrigin: "top center",
                      }}
                    />

                    {/* Needle tip with enhanced visibility */}
                    <div
                      className="absolute w-2 h-2 bg-white opacity-100 transition-all duration-1000"
                      style={{
                        left: `${needlePosition.x}%`,
                        top: `${needlePosition.y}%`,
                        clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                        filter: "drop-shadow(0 0 2px rgba(255,255,255,0.8))",
                      }}
                    />

                    {/* Needle contact point indicator */}
                    {currentStep >= 4 && (
                      <div
                        className="absolute w-4 h-4 border-2 border-yellow-300 rounded-full animate-pulse"
                        style={{
                          left: `${needlePosition.x - 1}%`,
                          top: `${needlePosition.y - 1}%`,
                        }}
                      />
                    )}
                  </>
                )}

                {/* Anesthetic spread visualization */}
                {predictedSpread && currentStep >= 4 && (
                  <>
                    {/* Primary spread around nerve */}
                    <div
                      className="absolute bg-blue-400 opacity-40 rounded-full animate-pulse transition-all duration-2000"
                      style={{
                        left: "18%",
                        top: "18%",
                        width: "28%",
                        height: "12%",
                        filter: "blur(2px)",
                      }}
                    />

                    {/* Secondary spread */}
                    <div
                      className="absolute bg-cyan-300 opacity-30 rounded-full animate-pulse transition-all duration-3000"
                      style={{
                        left: "15%",
                        top: "15%",
                        width: "35%",
                        height: "18%",
                        filter: "blur(3px)",
                        animationDelay: "0.5s",
                      }}
                    />

                    {/* Injection flow animation */}
                    <div
                      className="absolute w-1 bg-blue-300 opacity-80 animate-pulse rounded-full transition-all duration-1000"
                      style={{
                        left: `${needlePosition.x + 1}%`,
                        top: `${needlePosition.y}%`,
                        height: "8%",
                      }}
                    />
                  </>
                )}
              </div>

              {/* Anatomical labels */}
              {tissueData && currentStep >= 2 && (
                <>
                  <div className="absolute top-2 left-16 text-gray-300 text-xs font-mono bg-black bg-opacity-50 px-1 rounded">
                    피부
                  </div>
                  <div className="absolute top-8 left-16 text-yellow-300 text-xs font-mono bg-black bg-opacity-50 px-1 rounded">
                    피하지방
                  </div>
                  <div className="absolute top-20 left-4 text-red-300 text-xs font-mono bg-black bg-opacity-50 px-1 rounded">
                    사각근
                  </div>
                  <div className="absolute top-24 left-32 text-yellow-300 text-xs font-mono bg-black bg-opacity-50 px-1 rounded">
                    상완신경총
                  </div>
                  <div className="absolute top-32 right-8 text-red-300 text-xs font-mono bg-black bg-opacity-50 px-1 rounded">
                    쇄골하동맥
                  </div>
                  <div className="absolute top-36 right-20 text-blue-300 text-xs font-mono bg-black bg-opacity-50 px-1 rounded">
                    쇄골하정맥
                  </div>
                  <div className="absolute bottom-6 left-16 text-white text-xs font-mono bg-black bg-opacity-50 px-1 rounded">
                    제1늑골
                  </div>
                </>
              )}

              {/* Real-time measurements */}
              {currentStep >= 3 && (
                <div className="absolute top-4 right-4 space-y-1">
                  <div className="text-green-400 text-xs font-mono bg-black bg-opacity-70 px-2 py-1 rounded">
                    깊이: {(needlePosition.y * 0.8).toFixed(1)}cm
                  </div>
                  <div className="text-yellow-400 text-xs font-mono bg-black bg-opacity-70 px-2 py-1 rounded">
                    각도: 20°
                  </div>
                  {currentStep >= 4 && (
                    <div className="text-blue-400 text-xs font-mono bg-black bg-opacity-70 px-2 py-1 rounded animate-pulse">
                      주입중...
                    </div>
                  )}
                </div>
              )}

              {/* Scanning indicator */}
              {isScanning && (
                <div className="absolute top-4 left-4 text-green-400 text-sm font-mono animate-pulse">
                  스캔 중... 조직 분석
                </div>
              )}

              {/* Depth markers */}
              <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between text-green-400 text-xs font-mono py-4">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span className="text-gray-500">cm</span>
              </div>

              {/* Gain control simulation - moved to bottom right to avoid overlap */}
              <div className="absolute right-2 bottom-4 text-green-400 text-xs font-mono bg-black bg-opacity-50 px-2 py-1 rounded">
                <div>G: 65%</div>
                <div>D: 8.5cm</div>
                <div>F: 12MHz</div>
              </div>
            </div>

            {/* AI Processing Status */}
            {currentStep >= 3 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-blue-900">
                    AI 분석 진행중...
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-2000"
                    style={{ width: currentStep >= 4 ? "100%" : "60%" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - AI Recommendations */}
          <div className="space-y-6">
            {/* AI Analysis Results */}
            {aiAnalysis && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  AI 분석 결과
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">성공 확률</span>
                    <span className="text-2xl font-bold text-green-600">
                      {aiAnalysis.successProbability}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">권장 용량</p>
                      <p className="font-semibold text-blue-600">
                        {aiAnalysis.optimalVolume}ml
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">주입 각도</p>
                      <p className="font-semibold text-purple-600">
                        {aiAnalysis.injectionAngle}°
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600">예상 지속시간</p>
                    <p className="font-semibold text-orange-600">
                      {aiAnalysis.estimatedDuration}분
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Risk Factors */}
            {aiAnalysis && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  위험 요소
                </h3>
                <div className="space-y-3">
                  {aiAnalysis.riskFactors.map((risk, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg"
                    >
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-700">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {aiAnalysis && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  AI 권장사항
                </h3>
                <div className="space-y-3">
                  {aiAnalysis.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-gray-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Predicted Spread */}
            {predictedSpread && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  확산 예측
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">1차 확산:</span>
                    <span className="font-medium text-blue-600">
                      {predictedSpread.primary}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">2차 확산:</span>
                    <span className="font-medium text-green-600">
                      {predictedSpread.secondary}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">전체 커버리지:</span>
                    <span className="font-medium text-purple-600">
                      {predictedSpread.coverage}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            * 이 MVP는 핵심 기능 시연을 위한 프로토타입입니다. 실제 의료기기는
            아니며, 임상 환경에서 사용할 수 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
