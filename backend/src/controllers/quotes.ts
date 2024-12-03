import { Request, Response } from 'express';
import { Quote } from '../models/Quote';

export const createQuote = async (req: Request, res: Response) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();
    res.status(201).json(quote);
  } catch (error) {
    res.status(500).json({ message: 'Error creating quote request', error });
  }
};

export const getQuotes = async (req: Request, res: Response) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quotes', error });
  }
};

export const getQuote = async (req: Request, res: Response) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quote', error });
  }
};

export const updateQuote = async (req: Request, res: Response) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: 'Error updating quote', error });
  }
};

export const deleteQuote = async (req: Request, res: Response) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting quote', error });
  }
};
