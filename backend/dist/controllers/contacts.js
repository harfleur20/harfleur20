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
exports.deleteContact = exports.updateContact = exports.getContact = exports.getContacts = exports.createContact = void 0;
const Contact_1 = require("../models/Contact");
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = new Contact_1.Contact(req.body);
        yield contact.save();
        res.status(201).json(contact);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating contact', error });
    }
});
exports.createContact = createContact;
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield Contact_1.Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error });
    }
});
exports.getContacts = getContacts;
const getContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield Contact_1.Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching contact', error });
    }
});
exports.getContact = getContact;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield Contact_1.Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating contact', error });
    }
});
exports.updateContact = updateContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield Contact_1.Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error });
    }
});
exports.deleteContact = deleteContact;
