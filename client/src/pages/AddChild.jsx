import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createChild } from '../api';

const AVATARS = ['🧒', '👦', '👧', '🧒🏽', '👦🏻', '👧🏾', '🦸', '🧙', '🦊', '🐱', '🐻', '🦁'];

function AddChild() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    age: '',
    avatar: '🧒',
  });
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.age) {
      showToast('⚠️ Please fill all fields');
      return;
    }
    setSubmitting(true);
    try {
      await createChild({
        name: form.name.trim(),
        age: parseInt(form.age),
        avatar: form.avatar,
      });
      showToast('🎉 Child profile created!');
      setTimeout(() => navigate('/leaderboard'), 1500);
    } catch (err) {
      showToast('❌ Failed to create profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section" id="add-child-page">
      <div className="section__header">
        <h1 className="section__title">➕ Add a Learner</h1>
        <p className="section__subtitle">
          Create a profile to start tracking skills and earning points!
        </p>
      </div>

      <div className="form">
        <h3 className="form__title">👶 New Learner Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label">Name</label>
            <input
              className="form__input"
              type="text"
              placeholder="What's their name?"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              id="child-name-input"
            />
          </div>

          <div className="form__group">
            <label className="form__label">Age (3-15)</label>
            <input
              className="form__input"
              type="number"
              min="3"
              max="15"
              placeholder="How old are they?"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              required
              id="child-age-input"
            />
          </div>

          <div className="form__group">
            <label className="form__label">Choose an Avatar</label>
            <div className="form__avatars">
              {AVATARS.map((avatar) => (
                <button
                  type="button"
                  key={avatar}
                  className={`form__avatar-option ${
                    form.avatar === avatar ? 'form__avatar-option--selected' : ''
                  }`}
                  onClick={() => setForm({ ...form, avatar })}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
            disabled={submitting}
            id="create-child-btn"
          >
            {submitting ? '⏳ Creating...' : '🚀 Create Profile'}
          </button>
        </form>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}

export default AddChild;
