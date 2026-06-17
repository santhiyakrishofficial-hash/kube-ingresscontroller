import { useEffect, useState } from 'react';
import { getSkills, seedSkills } from '../api';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        await seedSkills();
        const res = await getSkills();
        setSkills(res.data);
      } catch (err) {
        console.error('Error loading skills:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <div className="loader__spinner"></div>
      </div>
    );
  }

  return (
    <section className="section" id="skills-page">
      <div className="section__header">
        <h1 className="section__title">🎯 All Skills</h1>
        <p className="section__subtitle">
          Master these amazing skills and become a super learner!
        </p>
      </div>

      {skills.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">🎯</div>
          <p className="empty-state__text">No skills available yet.</p>
        </div>
      ) : (
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              className="skill-card"
              key={skill._id}
              id={`skill-${skill.name.toLowerCase()}`}
              style={{
                '--skill-color': skill.color,
                animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
              }}
            >
              <div className="skill-card__icon">{skill.icon}</div>
              <h3 className="skill-card__name">{skill.name}</h3>
              <p className="skill-card__desc">{skill.description}</p>
              <div className="skill-card__meta">
                <span className="skill-card__levels">
                  📊 {skill.totalLevels} levels
                </span>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: skill.color,
                    display: 'inline-block',
                  }}
                ></span>
              </div>
              <div className="progress-bar" style={{ marginTop: '16px' }}>
                <div
                  className="progress-bar__fill"
                  style={{
                    width: '0%',
                    background: skill.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Skills;
