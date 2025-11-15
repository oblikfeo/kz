import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function Register() {
    const { flash } = usePage().props;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        code: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [codeSent, setCodeSent] = useState(flash?.verification_sent || false);
    const [sendingCode, setSendingCode] = useState(false);
    const [verificationCode, setVerificationCode] = useState(flash?.verification_code || '');

    useEffect(() => {
        if (flash?.verification_code) {
            setVerificationCode(flash.verification_code);
        }
        if (flash?.verification_sent) {
            setCodeSent(true);
        }
    }, [flash]);

    const handleSendCode = (e) => {
        e.preventDefault();
        setSendingCode(true);
        setErrors({});

        router.post('/auth/send-code', {
            email: formData.email,
        }, {
            onSuccess: (page) => {
                const flash = page.props.flash || {};
                setVerificationCode(flash.verification_code || '');
                setCodeSent(true);
                setSendingCode(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setSendingCode(false);
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        router.post('/auth/register', formData, {
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
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.field}>
                    <label style={styles.label}>Имя</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={styles.input}
                        required
                    />
                    {errors.name && <span style={styles.error}>{errors.name}</span>}
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Email</label>
                    <div style={styles.emailRow}>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                setCodeSent(false);
                                setVerificationCode('');
                            }}
                            style={{ ...styles.input, flex: 1 }}
                            required
                            disabled={codeSent}
                        />
                        <button
                            type="button"
                            onClick={handleSendCode}
                            disabled={!formData.email || sendingCode || codeSent}
                            style={styles.sendCodeButton}
                        >
                            {sendingCode ? 'Отправка...' : codeSent ? 'Отправлено' : 'Отправить код'}
                        </button>
                    </div>
                    {errors.email && <span style={styles.error}>{errors.email}</span>}
                    {verificationCode && (
                        <p style={styles.testCode}>
                            Тестовый код: <strong>{verificationCode}</strong>
                        </p>
                    )}
                </div>

                {codeSent && (
                    <div style={styles.field}>
                        <label style={styles.label}>Код подтверждения</label>
                        <input
                            type="text"
                            value={formData.code}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                                setFormData({ ...formData, code: value });
                            }}
                            style={styles.codeInput}
                            maxLength={4}
                            required
                            placeholder="0000"
                        />
                        {errors.code && <span style={styles.error}>{errors.code}</span>}
                    </div>
                )}

                <div style={styles.field}>
                    <label style={styles.label}>Пароль</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        style={styles.input}
                        required
                    />
                    {errors.password && <span style={styles.error}>{errors.password}</span>}
                </div>

                {errors.message && <div style={styles.errorMessage}>{errors.message}</div>}

                <button 
                    type="submit" 
                    disabled={loading || !codeSent || formData.code.length !== 4} 
                    style={{
                        ...styles.button,
                        opacity: (!codeSent || formData.code.length !== 4) ? 0.5 : 1,
                        cursor: (!codeSent || formData.code.length !== 4) ? 'not-allowed' : 'pointer',
                    }}
                >
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
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
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    emailRow: {
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start',
    },
    sendCodeButton: {
        padding: '10px 15px',
        fontSize: '14px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    },
    codeInput: {
        padding: '10px',
        fontSize: '24px',
        textAlign: 'center',
        letterSpacing: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontFamily: 'monospace',
    },
    testCode: {
        fontSize: '12px',
        color: '#007bff',
        marginTop: '5px',
        padding: '8px',
        backgroundColor: '#e7f3ff',
        borderRadius: '4px',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#28a745',
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
