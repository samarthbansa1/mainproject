import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useNavigate } from "react-router-dom";

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

const DashboardProblemDetail = () => {
    const navigate = useNavigate();
  const { p_id } = useParams();
  const [problem, setProblem] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await api.get(`/api/auth/dashboard/${p_id}/`);
        setProblem(res.data);
        setForm({
          ...res.data,
          examples: Array.isArray(res.data.examples) ? res.data.examples : [],
        });
      } catch (err) {
        setError('Failed to load problem');
        navigate("/dashboard");


      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [p_id]);

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
    const changedFields = {};
    Object.keys(form).forEach(key => {
      if (Array.isArray(form[key]) && Array.isArray(problem[key])) {
        if (JSON.stringify(form[key]) !== JSON.stringify(problem[key])) {
          changedFields[key] = form[key];
        }
      } else if (form[key] !== problem[key]) {
        changedFields[key] = form[key];
      }
    });
    if (Object.keys(changedFields).length === 0) {
      setSuccess('No changes to save.');
      return;
    }
    try {
      await api.patch(`/api/auth/dashboard/${p_id}/`, changedFields);
      setSuccess('Problem updated successfully!');
      setProblem({ ...problem, ...changedFields });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError('Failed to update problem.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className='bg-white min-h-full h-[100%] w-[100vw] p-4'>
      <h1 className="font-bold text-xl mb-4">Edit Problem</h1>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <label className="block mb-2 font-semibold">Problem Statement</label>
      <textarea
        name="problem_statement"
        value={form.problem_statement || ''}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
        rows={4}
      />

      <label className="block mb-2 font-semibold">Category</label>
      <select
        name="problem_category"
        value={form.problem_category || ''}
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
        value={form.difficulty || ''}
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
        Save Changes
      </button>
    </div>
  );
};

export default DashboardProblemDetail;
