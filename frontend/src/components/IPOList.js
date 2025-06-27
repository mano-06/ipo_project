import { useState, useEffect } from 'react';
import IPOCard from './IPOCard';

const faqs = [
  {
    question: 'How to Subscribe to an IPO?',
    answer: (
      <ul>
        <li>Step 1: Login to your respective service provider.</li>
        <li>Step 2: Click on the IPO button.</li>
        <li>Step 3: Select the IPO you want to bid and enter the relevant details.</li>
        <li>Step 4: Your subscription will be completed once you make the payment or give permission.</li>
      </ul>
    ),
  },
  { question: 'Should I buy an IPO first day?', answer: '' },
  { question: 'How do you know if an IPO is good?', answer: '' },
  { question: 'How to check IPO start date?', answer: '' },
  { question: 'What is issue size?', answer: '' },
  { question: 'How many shares in a lot?', answer: '' },
  { question: 'How is the lot size calculated?', answer: '' },
  { question: 'Who decides the IPO price band?', answer: '' },
  { question: 'What is IPO GMP?', answer: '' },
  { question: 'How many lots should I apply for IPO?', answer: '' },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions?</h2>
        <p className="faq-desc">Find answers to common questions that come in your mind related to IPO.</p>
        {faqs.map((faq, idx) => (
          <div key={faq.question} className="faq-item">
            <div
              className="faq-question-row"
              onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
            >
              <span className="faq-question">{faq.question}</span>
              <span className="faq-toggle">{openIndex === idx ? '−' : '+'}</span>
            </div>
            {openIndex === idx && faq.answer && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function IPOList() {
    const [ipos, setIpos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/ipos/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setIpos(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading IPOs...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="ipo-list-container">
            <div className="breadcrumb">
                <span className="breadcrumb-item">Bluestock</span>
                <span className="breadcrumb-separator">{'>'}</span>
                <span className="breadcrumb-item">IPO</span>
                <span className="breadcrumb-separator">{'>'}</span>
                <span className="breadcrumb-item active">Upcoming</span>
            </div>
            <h1>Upcoming IPOs...</h1>
            <p>Companies that have filled for an IPO with SEBI. Few details might be disclosed by the companies later.</p>
            <div className="ipo-grid">
                {ipos.map(ipo => (
                    <div key={ipo.id}>
                        <IPOCard ipo={ipo} />
                    </div>
                ))}
            </div>
            <FAQAccordion />
        </div>
    );
}

export default IPOList;