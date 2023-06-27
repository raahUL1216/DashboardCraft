const express = require('express');
const widgetController = require('../../controllers/widget.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth(), widgetController.createWidget);
router.get('/:id', auth(), widgetController.getWidget);
router.patch('/:id', auth(), widgetController.updateWidget);
router.delete('/:id', auth(), widgetController.deleteWidget);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Widgets
 *   description: Widget management
 */

/**
 * @swagger
 * /widget:
 *   post:
 *     summary: Create a widget
 *     description: Create type of widget
 *     tags: [Widgets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - data_source
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [barChart, heatmap, pieChart, line, table, pyramid, radar]
 *               data_source:
 *                 type: string
 *                 description: API url to get widget data
 *               config:
 *                  type: object
 *                  description: additional configurations like labels, color etc
 *             example:
 *               title: Bar
 *               type: barChart
 *               data_source: www.google.com
 *               config: {}
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Widget'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 *   /widget/{id}:
 *   get:
 *     summary: Get a widget
 *     description: get widget info
 *     tags: [Widgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Widget id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Widget'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a widget
 *     description: update widget by widgetId
 *     tags: [Widgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wdiget id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [barChart, heatmap, pieChart, line, table, pyramid, radar]
 *               data_source:
 *                 type: string
 *               config:
 *                 type: object
 *             example:
 *               title: Bar
 *               type: barChart
 *               data_source: www.google.com
 *               config: {}
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Widget'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a widget
 *     description: delete widget by widgetId
 *     tags: [Widgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Widget id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
