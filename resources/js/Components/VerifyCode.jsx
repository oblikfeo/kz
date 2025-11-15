import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function VerifyCode({ email, verificationCode }) {
    const [code, setCode] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        router.post('/auth/verify', {
            email: email,
            code: code,
        }, {
            onSuccess: () => {
                router.visit('/dashboard');
            },
            onError: (errors) => {
                setErrors(errors);
                setLoading(false);
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    return (
        <div style={styles.container}>
            <p style={styles.description}>
                Введите 4-значный код, отправленный на {email}
            </p>
            {verificationCode && (
                <p style={styles.testCode}>
                    Тестовый код: <strong>{verificationCode}</strong>
                </p>
            )}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.field}>
                    <label style={styles.label}>Код подтверждения</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                            setCode(value);
                        }}
                        style={styles.input}
                        maxLength={4}
                        required
                        placeholder="0000"
                    />
                    {errors.code && <span style={styles.error}>{errors.code}</span>}
                </div>

                {errors.message && <div style={styles.errorMessage}>{errors.message}</div>}

                <button type="submit" disabled={loading || code.length !== 4} style={styles.button}>
                    {loading ? 'Проверка...' : 'Подтвердить'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    description: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '20px',
        textAlign: 'center',
    },
    testCode: {
        fontSize: '14px',
        color: '#007bff',
        marginBottom: '20px',
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#e7f3ff',
        borderRadius: '4px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
    },
    input: {
        padding: '10px',
        fontSize: '24px',
        textAlign: 'center',
        letterSpacing: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontFamily: 'monospace',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '12px',
    },
    errorMessage: {
        color: 'red',
        fontSize: '14px',
        padding: '10px',
        backgroundColor: '#ffe6e6',
        borderRadius: '4px',
    },
};

