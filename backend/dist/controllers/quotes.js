"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuote = exports.updateQuote = exports.getQuote = exports.getQuotes = exports.createQuote = void 0;
const Quote_1 = require("../models/Quote");
const createQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quote = new Quote_1.Quote(req.body);
        yield quote.save();
        res.status(201).json(quote);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating quote request', error });
    }
});
exports.createQuote = createQuote;
const getQuotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quotes = yield Quote_1.Quote.find().sort({ createdAt: -1 });
        res.json(quotes);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching quotes', error });
    }
});
exports.getQuotes = getQuotes;
const getQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quote = yield Quote_1.Quote.findById(req.params.id);
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        res.json(quote);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching quote', error });
    }
});
exports.getQuote = getQuote;
const updateQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quote = yield Quote_1.Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        res.json(quote);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating quote', error });
    }
});
exports.updateQuote = updateQuote;
const deleteQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quote = yield Quote_1.Quote.findByIdAndDelete(req.params.id);
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        res.json({ message: 'Quote deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting quote', error });
    }
});
exports.deleteQuote = deleteQuote;
