import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const CATEGORY_CHOICES = [
  { value: 'arr', label: 'Arrays' },
  { value: 'matrix', label: 'Matrix' },
  { value: 'math', label: 'Mathematics' },
  { value: 'dp', label: 'Dynamic programming' },
  { value: 'graph', label: 'Graphs' },
];

const DIFFICULTY_CHOICES = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

const DashboardProblemCreate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    problem_statement: '',
    problem_category: '',
    difficulty: '',
    examples: [],
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExampleChange = (idx, field, value) => {
    setForm(prev => {
      const newExamples = prev.examples.map((ex, i) =>
        i === idx ? { ...ex, [field]: value } : ex
      );
      return { ...prev, examples: newExamples };
    });
  };

  const handleAddExample = () => {
    setForm(prev => ({
      ...prev,
      examples: [...(prev.examples || []), { input: '', output: '' }],
    }));
  };

  const handleRemoveExample = (idx) => {
    setForm(prev => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== idx),
    }));
  };

  const handleSave = async () => {
    setSuccess('');
    setError('');
    // Basic frontend validation (optional)
    if (!form.problem_statement || !form.problem_category || !form.difficulty) {
      setError('Please fill all required fields.');
      return;
    }
    try {
      const response = await api.post('/api/auth/dashboard/create/', form);
      setSuccess('Problem created successfully!');
      // Redirect to dashboard or to the new problem's detail page:
      navigate('/dashboard');
      // or: navigate(`/dashboard/${response.data.id}`);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError('Failed to create problem.');
      }
    }
  };

  return (
    <div className='bg-white min-h-full h-[100vh] w-[100vw] p-4'>
      <h1 className="font-bold text-xl mb-4">Create New Problem</h1>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <label className="block mb-2 font-semibold">Problem Statement</label>
      <textarea
        name="problem_statement"
        value={form.problem_statement}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
        rows={4}
      />

      <label className="block mb-2 font-semibold">Category</label>
      <select
        name="problem_category"
        value={form.problem_category}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
      >
        <option value="">Select Category</option>
        {CATEGORY_CHOICES.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <label className="block mb-2 font-semibold">Difficulty</label>
      <select
        name="difficulty"
        value={form.difficulty}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
      >
        <option value="">Select Difficulty</option>
        {DIFFICULTY_CHOICES.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <label className="block mb-2 font-semibold">Examples</label>
      <div className="mb-4">
        {(form.examples || []).map((example, idx) => (
          <div key={idx} className="flex items-center mb-2 gap-2">
            <input
              type="text"
              placeholder="Input"
              value={example.input}
              onChange={e => handleExampleChange(idx, 'input', e.target.value)}
              className="border p-1 mr-2 flex-1"
            />
            <input
              type="text"
              placeholder="Output"
              value={example.output}
              onChange={e => handleExampleChange(idx, 'output', e.target.value)}
              className="border p-1 mr-2 flex-1"
            />
            <button
              type="button"
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleRemoveExample(idx)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-green-500 text-white px-2 py-1 rounded mt-2"
          onClick={handleAddExample}
        >
          Add Example
        </button>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSave}
      >
        Create Problem
      </button>
    </div>
  );
};

export default DashboardProblemCreate;
