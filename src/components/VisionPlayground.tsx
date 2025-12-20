import React, { useState, useCallback } from 'react';
import { visionAnalysis } from '../lib/firebase';
import { useDropzone } from 'react-dropzone';

type Mode = 'invoice' | 'safety';

const VisionPlayground: React.FC = () => {
  const [mode, setMode] = useState<Mode>('invoice');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await visionAnalysis({
        imageBase64: image,
        mode,
      });
      
      const jsonStr = (response.data as any).jsonResult;
      const parsedResult = JSON.parse(jsonStr);
      setResult(parsedResult);
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Header Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50">
        <button
          onClick={() => { setMode('invoice'); handleReset(); }}
          className={`flex-1 py-4 text-sm font-semibold transition-colors ${
            mode === 'invoice'
              ? 'bg-white text-blue-700 border-t-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
          }`}
        >
          📄 Invoice Automation
        </button>
        <button
          onClick={() => { setMode('safety'); handleReset(); }}
          className={`flex-1 py-4 text-sm font-semibold transition-colors ${
            mode === 'safety'
              ? 'bg-white text-blue-700 border-t-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
          }`}
        >
          🚧 Site Safety Eyes
        </button>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Upload */}
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-slate-900">
                {mode === 'invoice' ? 'Extract Data from Invoices' : 'Detect Safety Hazards'}
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                {mode === 'invoice' 
                  ? 'Upload an invoice image to instantly extract fields like vendor, date, and line items.' 
                  : 'Upload a job site photo to identify potential OSHA violations and safety risks.'}
              </p>
            </div>

            {!image ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <p className="text-slate-900 font-medium">Click to upload or drag & drop</p>
                <p className="text-slate-500 text-xs mt-1">JPG, PNG supported</p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <img src={image} alt="Preview" className="w-full h-auto object-cover max-h-[400px]" />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-slate-600 hover:text-red-600 hover:bg-white shadow-sm transition-all"
                  title="Remove image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <button
              onClick={analyzeImage}
              disabled={!image || loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-600/20"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </span>
              ) : (
                'Run AI Analysis'
              )}
            </button>
          </div>

          {/* Right Column: Results */}
          <div className="bg-slate-900 rounded-xl p-6 text-slate-300 font-mono text-sm overflow-auto max-h-[500px] border border-slate-800 shadow-inner">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
              <span className="font-bold text-slate-100 uppercase tracking-wider text-xs">Analysis Result</span>
              {result && (
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Complete
                </span>
              )}
            </div>

            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-800 rounded w-1/2" />
                <div className="h-4 bg-slate-800 rounded w-5/6" />
                <div className="h-4 bg-slate-800 rounded w-2/3" />
              </div>
            ) : error ? (
              <div className="text-red-400 p-3 bg-red-900/20 rounded-lg border border-red-900/50">
                Error: {error}
              </div>
            ) : result ? (
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            ) : (
              <div className="text-slate-500 italic py-10 text-center">
                Waiting for input...
                <br/>
                Upload an image to see the AI output here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionPlayground;
