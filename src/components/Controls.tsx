import React, { useEffect, useState } from 'react';
import { useMatrix } from '../contexts/MatrixContext';
import '../styles/Controls.css';

interface ControlsProps {
  onGenerate: () => void;
  initialValues?: { m: number; n: number; x: number } | null;
}

interface FormValues {
  m: string;
  n: string;
  x: string;
}

interface TouchedFields {
  m: boolean;
  n: boolean;
  x: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onGenerate, initialValues }) => {
  const { setParams } = useMatrix();
  const [formValues, setFormValues] = useState<FormValues>({
    m: '',
    n: '',
    x: '',
  });
  const [touched, setTouched] = useState<TouchedFields>({
    m: false,
    n: false,
    x: false,
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        m: initialValues.m.toString(),
        n: initialValues.n.toString(),
        x: initialValues.x.toString(),
      });
    }
  }, [initialValues]);

  const validateFields = (name: keyof FormValues, value: string) => {
    const numValue = parseInt(value);

    if (value === '') {
      return 'This field is required';
    }

    switch (name) {
      case 'm':
      case 'n':
        if (numValue < 1 || numValue > 100) {
          return 'Must be between 1 and 100';
        }
        break;
      case 'x': {
        const maxX = parseInt(formValues.m) * parseInt(formValues.n);

        if (numValue < 1 || numValue > maxX) {
          return `X must be between 1 and ${maxX} (formValues.m * formValues.n)`;
        }
        break;
      }
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateFields(name as keyof FormValues, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      m: true,
      n: true,
      x: true,
    });

    const newErrors: Partial<FormValues> = {};

    Object.keys(formValues).forEach((key) => {
      const error = validateFields(key as keyof FormValues, formValues[key as keyof FormValues]);

      if (error) {
        newErrors[key as keyof FormValues] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length) {
      return;
    }

    const m = parseInt(formValues.m);
    const n = parseInt(formValues.n);
    const x = parseInt(formValues.x);

    setParams({ m, n, x });
    onGenerate();
  };

  const maxX = formValues.m && formValues.n ? parseInt(formValues.m) * parseInt(formValues.n) : 0;

  return (
    <div className="controls">
      <form className="contols__form" onSubmit={handleSubmit}>
        <div className="controls__form-group">
          <label className="controls__label">
            Enter the number of rows (1-100):
            <input
              className="controls__input"
              type="number"
              name="m"
              value={formValues.m}
              onChange={handleChange}
              onBlur={handleBlur}
              min={1}
              max={100}
              required
            />
            {touched.m && errors.m && <div className="controls__error-message">{errors.m}</div>}
          </label>
        </div>

        <div className="controls__form-group">
          <label className="controls__label">
            Enter the number of columns (1-100):
            <input
              className="controls__input"
              type="number"
              name="n"
              value={formValues.n}
              onChange={handleChange}
              onBlur={handleBlur}
              min={1}
              max={100}
              required
            />
            {touched.n && errors.n && <div className="controls__error-message">{errors.n}</div>}
          </label>
        </div>

        <div className="controls__form-group">
          <label className="controls__label">
            Enter the X (the number of selected cells, when you select a cell(hover)):
            <input
              className="controls__input"
              type="number"
              name="x"
              value={formValues.x}
              onChange={handleChange}
              onBlur={handleBlur}
              min={1}
              max={maxX || 100}
              required
            />
            {touched.x && errors.x && <div className="controls__error-message">{errors.x}</div>}
            {maxX > 0 && <div className="controls__hint">Max possible X: {maxX}</div>}
          </label>
        </div>

        <button type="submit" className="controls__button">
          Generate Matrix
        </button>
      </form>
    </div>
  );
};

export default Controls;
