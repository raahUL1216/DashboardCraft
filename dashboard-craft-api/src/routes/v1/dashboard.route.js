const express = require('express');
const auth = require('../../middlewares/auth');

const dashboardController = require('../../controllers/dashboard.controller');

const router = express.Router();

router.post('/', auth(), dashboardController.createDashboard);
router.get('/:id', auth(), dashboardController.getDashboard);
router.patch('/:id', auth(), dashboardController.updateDashboard);
router.delete('/:id', auth(), dashboardController.deleteDashboard);

router.post('/:id/share/:userId', auth(), dashboardController.shareDashboard);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Dashboards
 *   description: Dashboard management
 */

/**
 * @swagger
 * /dashboard:
 *   post:
 *     summary: Create a dashboard
 *     description: Create dashboard and its layout with widgets.
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - layout
 *             properties:
 *               name:
 *                 type: string
 *               layout:
 *                 type: object
 *                 description: layout contains n*3 matrix of objects with properties (widget id and widget position)
 *             example:
 *               name: Dashboard 1
 *               layout: [[{"widget":"649b241daa214b33bc3ca16a","position":{"row":1,"col":1,"sizeX":1,"sizeY":1}},{"widget":"649b51d05025f55720347d93","position":{"row":1,"col":2,"sizeX":1,"sizeY":1}},{"widget":"649b52234f03d61f5cad38eb","position":{"row":1,"col":3,"sizeX":1,"sizeY":1}}],[{"widget":"649b52334f03d61f5cad38ee","position":{"row":2,"col":1,"sizeX":2,"sizeY":1}},{"widget":"649b52474f03d61f5cad38f1","position":{"row":2,"col":3,"sizeX":1,"sizeY":2}}],[{"widget":"649b52544f03d61f5cad38f4","position":{"row":3,"col":1,"sizeX":1,"sizeY":1}},{"widget":"649b527a4f03d61f5cad38f9","position":{"row":3,"col":2,"sizeX":1,"sizeY":1}}]]
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Dashboard'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /dashboard/{id}:
 *   get:
 *     summary: Get a dashboard
 *     description: Get dashboard and its widgets
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dashboard id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Dashboard'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a dashboard
 *     description: Update dashboard info or widgets (or layout design)
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dashboard id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - layout
 *             properties:
 *               name:
 *                 type: string
 *               layout:
 *                 type: object
 *                 description: layout contains n*3 matrix of objects with properties (widget id and widget position)
 *             example:
 *               name: Dashboard 1
 *               layout: [[{"widget":"649b241daa214b33bc3ca16a","position":{"row":1,"col":1,"sizeX":1,"sizeY":1}},{"widget":"649b51d05025f55720347d93","position":{"row":1,"col":2,"sizeX":1,"sizeY":1}},{"widget":"649b52234f03d61f5cad38eb","position":{"row":1,"col":3,"sizeX":1,"sizeY":1}}],[{"widget":"649b52334f03d61f5cad38ee","position":{"row":2,"col":1,"sizeX":2,"sizeY":1}},{"widget":"649b52474f03d61f5cad38f1","position":{"row":2,"col":3,"sizeX":1,"sizeY":2}}],[{"widget":"649b52544f03d61f5cad38f4","position":{"row":3,"col":1,"sizeX":1,"sizeY":1}},{"widget":"649b527a4f03d61f5cad38f9","position":{"row":3,"col":2,"sizeX":1,"sizeY":1}}]]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Dashboard'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a dashboard
 *     description: Deletes dashboard
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dashboard id
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


/**
 * @swagger
 * /dashboard/{id}/share/{userId}:
 *   post:
 *     summary: Share dashboard
 *     description: Share view access of dashboard with another user
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dashboard id
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Dashboard'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
