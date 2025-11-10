import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from '../../Components/Layout';

function RoleButton({ icon, title, description, onClick }) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <button
            type="button"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                ...styles.roleButton,
                ...(isHovered ? styles.roleButtonHover : {}),
            }}
        >
            <div style={styles.roleIcon}>{icon}</div>
            <div style={styles.roleTitle}>{title}</div>
            <div style={styles.roleDescription}>{description}</div>
        </button>
    );
}

export default function Register({ auth }) {
    const [step, setStep] = useState(1); // 1 - выбор роли, 2 - форма регистрации
    const { data, setData, post, processing, errors } = useForm({
        role: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const selectRole = (role) => {
        setData('role', role);
        setStep(2);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    const goBack = () => {
        setStep(1);
        setData('role', '');
    };

    return (
        <Layout auth={auth}>
            <div style={styles.container}>
                <div style={styles.card}>
                    {step === 1 ? (
                        <>
                            <h2 style={styles.title}>Выберите вашу роль</h2>
                            <p style={styles.subtitle}>Кто вы?</p>
                            
                            <div style={styles.roleContainer}>
                                <RoleButton
                                    icon="🛒"
                                    title="Покупатель"
                                    description="Я хочу покупать товары и услуги"
                                    onClick={() => selectRole('buyer')}
                                />
                                <RoleButton
                                    icon="🏪"
                                    title="Продавец"
                                    description="Я хочу продавать товары и услуги"
                                    onClick={() => selectRole('seller')}
                                />
                            </div>

                            <div style={styles.links}>
                                <Link href="/login" style={styles.link}>
                                    Уже есть аккаунт? Войти
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={styles.header}>
                                <button
                                    type="button"
                                    onClick={goBack}
                                    style={styles.backButton}
                                >
                                    ← Назад
                                </button>
                                <h2 style={styles.title}>Регистрация</h2>
                                <div style={styles.roleBadge}>
                                    {data.role === 'buyer' ? '🛒 Покупатель' : '🏪 Продавец'}
                                </div>
                            </div>

                            <form onSubmit={submit} style={styles.form}>
                                <div style={styles.field}>
                                    <label style={styles.label}>Имя</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        style={styles.input}
                                        autoFocus
                                    />
                                    {errors.name && (
                                        <div style={styles.error}>{errors.name}</div>
                                    )}
                                </div>

                                <div style={styles.field}>
                                    <label style={styles.label}>Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        style={styles.input}
                                    />
                                    {errors.email && (
                                        <div style={styles.error}>{errors.email}</div>
                                    )}
                                </div>

                                <div style={styles.field}>
                                    <label style={styles.label}>Пароль</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        style={styles.input}
                                    />
                                    {errors.password && (
                                        <div style={styles.error}>{errors.password}</div>
                                    )}
                                </div>

                                <div style={styles.field}>
                                    <label style={styles.label}>Подтверждение пароля</label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        style={styles.input}
                                    />
                                    {errors.password_confirmation && (
                                        <div style={styles.error}>{errors.password_confirmation}</div>
                                    )}
                                </div>

                                {errors.role && (
                                    <div style={styles.error}>{errors.role}</div>
                                )}

                                <div style={styles.actions}>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        style={styles.button}
                                    >
                                        {processing ? 'Регистрация...' : 'Зарегистрироваться'}
                                    </button>
                                </div>
                            </form>

                            <div style={styles.links}>
                                <Link href="/login" style={styles.link}>
                                    Уже есть аккаунт? Войти
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}

const styles = {
    container: {
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '600px',
    },
    title: {
        margin: '0 0 10px 0',
        fontSize: '28px',
        fontWeight: '600',
        textAlign: 'center',
        color: '#333',
    },
    subtitle: {
        margin: '0 0 30px 0',
        fontSize: '16px',
        textAlign: 'center',
        color: '#666',
    },
    header: {
        position: 'relative',
        marginBottom: '20px',
    },
    backButton: {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#007bff',
        fontSize: '16px',
        cursor: 'pointer',
        padding: '5px 0',
    },
    roleBadge: {
        textAlign: 'center',
        marginTop: '10px',
        fontSize: '14px',
        color: '#666',
        fontWeight: '500',
    },
    roleContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
    },
    roleButton: {
        padding: '30px 20px',
        border: '2px solid #e0e0e0',
        borderRadius: '12px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'all 0.3s',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
    },
    roleButtonHover: {
        border: '2px solid #007bff',
        backgroundColor: '#f0f7ff',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,123,255,0.15)',
    },
    roleIcon: {
        fontSize: '48px',
        marginBottom: '10px',
    },
    roleTitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#333',
    },
    roleDescription: {
        fontSize: '14px',
        color: '#666',
        lineHeight: '1.5',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    field: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
    },
    error: {
        marginTop: '5px',
        fontSize: '14px',
        color: '#dc3545',
    },
    actions: {
        marginTop: '10px',
    },
    button: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    links: {
        marginTop: '20px',
        textAlign: 'center',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '14px',
        transition: 'color 0.2s',
    },
};
