import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Button = styled.button`
    background-color: ${props => props.variant === 'secondary' ? theme.colors.secondary : theme.colors.primary};
    color: ${theme.colors.textLight};
    border: none;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border-radius: ${theme.borderRadius.sm};
    font-family: ${theme.fonts.main};
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${props => props.variant === 'secondary' ? theme.colors.secondaryDark : theme.colors.primaryDark};
    }

    &:disabled {
        background-color: ${theme.colors.disabled};
        cursor: not-allowed;
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: ${theme.spacing.sm};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
    font-family: ${theme.fonts.main};
    font-size: 14px;
    color: ${theme.colors.text};
    background-color: ${theme.colors.surface};

    &:focus {
        outline: none;
        border-color: ${theme.colors.primary};
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: ${theme.spacing.sm};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
    font-family: ${theme.fonts.main};
    font-size: 14px;
    color: ${theme.colors.text};
    background-color: ${theme.colors.surface};

    &:focus {
        outline: none;
        border-color: ${theme.colors.primary};
    }
`;

export const Card = styled.div`
    background-color: ${theme.colors.surface};
    border-radius: ${theme.borderRadius.md};
    box-shadow: ${theme.shadows.md};
    padding: ${theme.spacing.lg};
`;

export const Modal = styled.div`
    background-color: ${theme.colors.surface};
    border-radius: ${theme.borderRadius.md};
    box-shadow: ${theme.shadows.lg};
    padding: ${theme.spacing.xl};
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
`;

export const Th = styled.th`
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    padding: ${theme.spacing.sm};
    text-align: left;
    font-weight: bold;
`;

export const Td = styled.td`
    padding: ${theme.spacing.sm};
    border-bottom: 1px solid ${theme.colors.border};
`;

export const Tr = styled.tr`
    &:hover {
        background-color: ${theme.colors.background};
    }
`;

export const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${theme.spacing.md};
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin-bottom: ${theme.spacing.xs};
    font-weight: bold;
    color: ${theme.colors.text};
`;