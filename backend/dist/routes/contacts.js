"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contacts_1 = require("../controllers/contacts");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public routes
router.post('/', contacts_1.createContact);
// Protected routes
router.get('/', auth_1.auth, contacts_1.getContacts);
router.get('/:id', auth_1.auth, contacts_1.getContact);
router.patch('/:id', auth_1.auth, contacts_1.updateContact);
router.delete('/:id', auth_1.auth, contacts_1.deleteContact);
exports.default = router;
