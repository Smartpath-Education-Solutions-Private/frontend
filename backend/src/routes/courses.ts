import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: { author: { select: { id: true, name: true } } },
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Create a new course
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, status, image, chapters } = req.body;
    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        category,
        status,
        image,
        author: { connect: { id: req.userId } },
        chapters: {
          create: chapters,
        },
      },
      include: { chapters: true },
    });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course' });
  }
});

// Update a course
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, status, image, chapters } = req.body;
    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        category,
        status,
        image,
        chapters: {
          deleteMany: {},
          create: chapters,
        },
      },
      include: { chapters: true },
    });
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course' });
  }
});

// Delete a course
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course' });
  }
});

export default router;