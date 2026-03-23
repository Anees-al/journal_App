import Journal from '../models/Journal.js';

// @desc    Get all journals
// @route   GET /api/journals
export const getJournals = async (req, res) => {
    try {
        const journals = await Journal.find().sort({ date: -1 });
        res.status(200).json({ success: true, count: journals.length, data: journals });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create a journal
// @route   POST /api/journals
export const createJournal = async (req, res) => {
    try {
        const { title, content, mood, date } = req.body;
        const journal = await Journal.create({ title, content, mood, date });
        res.status(201).json({ success: true, data: journal });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update a journal
// @route   PUT /api/journals/:id
export const updateJournal = async (req, res) => {
    try {
        const { title, content, mood } = req.body;
        const journal = await Journal.findByIdAndUpdate(
            req.params.id,
            { title, content, mood },
            { new: true, runValidators: true }
        );

        if (!journal) {
            return res.status(404).json({ success: false, error: 'No journal found' });
        }

        res.status(200).json({ success: true, data: journal });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete a journal
// @route   DELETE /api/journals/:id
export const deleteJournal = async (req, res) => {
    try {
        const journal = await Journal.findById(req.params.id);

        if (!journal) {
            return res.status(404).json({ success: false, error: 'No journal found' });
        }

        await journal.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
