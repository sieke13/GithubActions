import type { Request, Response } from 'express';
// import question model
import Question from '../models/Question.js';
import db from '../config/connection.js';

// gets a set of random questions
export const getRandomQuestions = async (_req: Request, res: Response) => {
  try {
    // Check database connection first
    if (db.readyState !== 1) {
      console.error('Database not connected! ReadyState:', db.readyState);
      return res.status(500).json({ 
        error: 'Database connection not available',
        details: 'The server cannot connect to the database'
      });
    }

    const questions = await Question.aggregate([
      { $sample: { size: 10 } },
      { $project: { __v: 0 } }]);
    
    // Check if we got questions back
    if (!questions || questions.length === 0) {
      console.log('No questions found in database');
      return res.status(404).json({ error: 'No questions found' });
    }
    
    console.log(`Successfully retrieved ${questions.length} questions`);
    return res.status(200).json(questions);
  } catch (err: any) {
    console.error('Error in getRandomQuestions:', err);
    return res.status(500).json({ 
      error: err.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack 
    });
  }
};
