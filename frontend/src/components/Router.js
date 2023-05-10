import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Books} from './pages/Books';
import {Add} from './pages/Add';
import {Update} from './pages/Update';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
};