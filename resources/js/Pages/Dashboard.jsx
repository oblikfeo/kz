import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Dashboard({ user }) {
    const [showEmailChange, setShowEmailChange] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [testCode, setTestCode] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleRequestEmailChange = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        router.post('/dashboard/email/request', {
            email: newEmail,
        }, {
            onSuccess: (page) => {
                const flash = page.props.flash || {};
                setTestCode(flash.verification_code || '');
                setShowCodeInput(true);
                setLoading(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setLoading(false);
            },
        });
    };

    const handleVerifyEmailChange = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        router.post('/dashboard/email/verify', {
            code: verificationCode,
        }, {
            onSuccess: () => {
                router.reload();
                setShowEmailChange(false);
                setShowCodeInput(false);
                setNewEmail('');
                setVerificationCode('');
                setTestCode('');
            },
            onError: (errors) => {
                setErrors(errors);
                setLoading(false);
            },
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Личный кабинет</h1>
                <button
                    onClick={() => router.post('/logout')}
                    style={styles.logoutButton}
                >
                    Выйти
                </button>
            </div>

            <div style={styles.content}>
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Профиль</h2>
                    <div style={styles.info}>
                        <div style={styles.infoRow}>
                            <span style={styles.label}>Имя:</span>
                            <span style={styles.value}>{user.name}</span>
                        </div>
                        <div style={styles.infoRow}>
                            <span style={styles.label}>Email:</span>
                            <span style={styles.value}>{user.email}</span>
                            {user.email_verified ? (
                                <span style={styles.verified}>✓ Подтвержден</span>
                            ) : (
                                <span style={styles.unverified}>✗ Не подтвержден</span>
                            )}
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Смена почты</h2>
                    {!showEmailChange ? (
                        <button
                            onClick={() => setShowEmailChange(true)}
                            style={styles.button}
                        >
                            Изменить email
                        </button>
                    ) : (
                        <div style={styles.form}>
                            {!showCodeInput ? (
                                <form onSubmit={handleRequestEmailChange}>
                                    <div style={styles.field}>
                                        <label style={styles.label}>Новый email</label>
                                        <input
                                            type="email"
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            style={styles.input}
                                            required
                                        />
                                        {errors.email && (
                                            <span style={styles.error}>{errors.email}</span>
                                        )}
                                    </div>
                                    {errors.message && (
                                        <div style={styles.errorMessage}>{errors.message}</div>
                                    )}
                                    <div style={styles.buttons}>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            style={styles.button}
                                        >
                                            {loading ? 'Отправка...' : 'Отправить код'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowEmailChange(false);
                                                setNewEmail('');
                                                setErrors({});
                                            }}
                                            style={styles.cancelButton}
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={handleVerifyEmailChange}>
                                    <p style={styles.description}>
                                        Введите код, отправленный на {newEmail}
                                    </p>
                                    {testCode && (
                                        <p style={styles.testCode}>
                                            Тестовый код: <strong>{testCode}</strong>
                                        </p>
                                    )}
                                    <div style={styles.field}>
                                        <label style={styles.label}>Код подтверждения</label>
                                        <input
                                            type="text"
                                            value={verificationCode}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                setVerificationCode(value);
                                            }}
                                            style={styles.input}
                                            maxLength={4}
                                            required
                                            placeholder="0000"
                                        />
                                        {errors.code && (
                                            <span style={styles.error}>{errors.code}</span>
                                        )}
                                    </div>
                                    {errors.message && (
                                        <div style={styles.errorMessage}>{errors.message}</div>
                                    )}
                                    <div style={styles.buttons}>
                                        <button
                                            type="submit"
                                            disabled={loading || verificationCode.length !== 4}
                                            style={styles.button}
                                        >
                                            {loading ? 'Проверка...' : 'Подтвердить'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowCodeInput(false);
                                                setVerificationCode('');
                                                setTestCode('');
                                                setErrors({});
                                            }}
                                            style={styles.cancelButton}
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
    },
    header: {
        maxWidth: '800px',
        margin: '0 auto 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: '32px',
        margin: 0,
    },
    logoutButton: {
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    content: {
        maxWidth: '800px',
        margin: '0 auto',
    },
    section: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    sectionTitle: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    infoRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    label: {
        fontWeight: '500',
        minWidth: '100px',
    },
    value: {
        color: '#666',
    },
    verified: {
        color: '#28a745',
        fontSize: '14px',
        marginLeft: '10px',
    },
    unverified: {
        color: '#dc3545',
        fontSize: '14px',
        marginLeft: '10px',
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
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    description: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '10px',
    },
    testCode: {
        fontSize: '14px',
        color: '#007bff',
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#e7f3ff',
        borderRadius: '4px',
    },
    buttons: {
        display: 'flex',
        gap: '10px',
    },
    button: {
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    cancelButton: {
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#6c757d',
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

