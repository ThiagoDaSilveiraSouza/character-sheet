import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaBook, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const MenuContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-250px')};
  width: 250px;
  height: 100vh;
  background-color: ${theme.colors.primary};
  transition: left 0.3s ease-in-out;
  z-index: 1000;
`;

const MenuToggle = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  color: ${({ $isOpen }) => $isOpen ? theme.colors.text.light : theme.colors.primary};
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: color 0.3s ease-in-out;

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }

  &::after {
    content: none;
  }
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 60px;
`;

const MenuItem = styled.li`
  padding: 0;
`;

const MenuLink = styled(Link)`
  color: ${theme.colors.text.light};
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  width: 100%;
  transition: background-color 0.3s ease;
  
  svg {
    margin-right: 10px;
  }

  &:hover {
    background-color: ${theme.colors.primaryHover};
    color: ${theme.colors.text.light}; // Mantém a cor do texto clara ao passar o mouse
  }
`;

export const SideMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <MenuToggle onClick={toggleMenu} $isOpen={isOpen}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MenuToggle>
      <MenuContainer $isOpen={isOpen} ref={menuRef}>
        <MenuList>
          <MenuItem>
            <MenuLink to="/" onClick={toggleMenu}>
              <FaHome /> Início
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/magias" onClick={toggleMenu}>
              <FaBook /> Magias
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/ficha-do-personagem" onClick={toggleMenu}>
              <FaUser /> Ficha do Personagem
            </MenuLink>
          </MenuItem>
        </MenuList>
      </MenuContainer>
    </>
  );
};
