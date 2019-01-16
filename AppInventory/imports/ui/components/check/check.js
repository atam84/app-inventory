import { collections } from '../../../datastructure/datastructure.js'
import { Template } from 'meteor/templating'
import { _ } from 'underscore'
import { ReactiveVar } from 'meteor/reactive-var'
import SimpleSchema from 'simpl-schema'
import { EJSON } from 'meteor/ejson'

import "./check.html"

let _vdiInfo = [
    {hostname: 'messi-siloe-vdi', ip: '10.89.156.234', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-siloe-w7', ip: '10.89.156.165', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-13', ip: '10.89.156.33', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-36',  ip: '10.89.156.56', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-cedre-w7', ip: '10.89.156.154', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-spectr-w7', ip: '10.89.156.244', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-121', ip: '10.89.157.121', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-81',  ip: '10.89.157.41', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-vigik-pw7', ip: '10.89.157.64', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-vigik-pxp', ip: '10.89.157.65', cluster:'VM (CLS_MESSI)', type: 'WinXP'},
    {hostname: 'messi-flexigo-1', ip: '10.89.157.17', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-118', ip: '10.89.157.90', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-94',  ip: '10.89.157.54', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-vigik-w72', ip: '10.89.156.99', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-vigik-xp2', ip: '10.89.157.204', cluster:'VM (CLS_MESSI)', type: 'WinXP'},
    {hostname: 'messi-win7-160', ip: '10.89.112.12', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-25',  ip: '10.89.156.45', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-05',  ip: '10.89.156.25', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-167', ip: '10.89.112.28', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-171', ip: '10.89.112.32', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-202', ip: '10.89.112.69', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-51',  ip: '10.89.156.71', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-168', ip: '10.89.112.29', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-run-tse02', ip: '10.89.99.133', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-172', ip: '10.89.112.33', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-42',  ip: '10.89.156.62', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-173', ip: '10.89.112.34', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-47',  ip: '10.89.156.67', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-134', ip: '10.89.156.40', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-155', ip: '10.89.112.13', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-31',  ip: '10.89.156.51', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-96',  ip: '10.89.157.56', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-109', ip: '10.89.157.79', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-198', ip: '10.89.112.65', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-93',  ip: '10.89.157.53', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-101', ip: '10.89.157.71', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-87',  ip: '10.89.157.47', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-102', ip: '10.89.157.72', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-166', ip: '10.89.112.27', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-170', ip: '10.89.112.31', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-10',  ip: '10.89.156.30', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-100', ip: '10.89.157.70', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-156', ip: '10.89.112.14', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-07',  ip: '10.89.156.27', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-98',  ip: '10.89.157.58', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-132', ip: '10.89.156.35', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-157', ip: '10.89.112.15', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-92',  ip: '10.89.157.52', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-149', ip: '10.89.157.239', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-99',  ip: '10.89.157.59', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-zack-w7',  ip: '10.89.157.73', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-115', ip: '10.89.157.85', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-142', ip: '10.89.156.84', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-143', ip: '10.89.157.186', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-114', ip: '10.89.157.84', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-158', ip: '10.89.112.16', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-135', ip: '10.89.156.48', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-189', ip: '10.89.112.53', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-136', ip: '10.89.156.49', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-159', ip: '10.89.112.17', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-178', ip: '10.89.112.40', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-69',  ip: '10.89.156.89', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-138', ip: '10.89.156.59', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-144', ip: '10.89.157.187', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-188', ip: '10.89.112.52', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-145', ip: '10.89.157.188', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-147', ip: '10.89.157.210', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-148', ip: '10.89.157.238', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-153', ip: '10.89.112.9', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-186', ip: '10.89.112.48', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-150', ip: '10.89.157.241', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-201', ip: '10.89.112.68', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-03',  ip: '10.89.156.23', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-190', ip: '10.89.112.54', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-205', ip: '10.89.112.73', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-194', ip: '10.89.112.61', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-ldev-bo5', ip: '10.89.157.98', cluster:'VM (CLS_MESSI)', type: 'WinXP SP3'},
    {hostname: 'messi-win7-165', ip: '10.89.112.23', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-60', ip: '10.89.156.80', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-195', ip: '10.89.112.62', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-63', ip: '10.89.156.83', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-66', ip: '10.89.156.86', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-48', ip: '10.89.156.68', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-49', ip: '10.89.156.69', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-67', ip: '10.89.156.87', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-162', ip: '10.89.112.20', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-183', ip: '10.89.112.45', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-74', ip: '10.89.156.94', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-14', ip: '10.89.156.34', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-181', ip: '10.89.112.43', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-73', ip: '10.89.156.93', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-161', ip: '10.89.112.19', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-55', ip: '10.89.156.75', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-180', ip: '10.89.112.42', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-02', ip: '10.89.156.22', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-71', ip: '10.89.156.91', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-16', ip: '10.89.156.36', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-78', ip: '10.89.156.98', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-88', ip: '10.89.157.48', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-56', ip: '10.89.156.76', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-41', ip: '10.89.156.61', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-117', ip: '10.89.157.89', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-19', ip: '10.89.156.39', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-70', ip: '10.89.156.90', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-01', ip: '10.89.156.21', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-139', ip: '10.89.156.183', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-21', ip: '10.89.156.41', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-04', ip: '10.89.156.24', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-163', ip: '10.89.112.21', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-09', ip: '10.89.156.29', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-32', ip: '10.89.156.52', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-33', ip: '10.89.156.53', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-37', ip: '10.89.156.57', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-34', ip: '10.89.156.54', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-61', ip: '10.89.156.81', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-44', ip: '10.89.156.64', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-40', ip: '10.89.156.60', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-26', ip: '10.89.156.46', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-46', ip: '10.89.156.66', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-11', ip: '10.89.156.31', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-12', ip: '10.89.156.32', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-30', ip: '10.89.156.50', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-106', ip: '10.89.157.76', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-77', ip: '10.89.156.97', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-184', ip: '10.89.112.46', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-62', ip: '10.89.156.82', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-123', ip: '10.89.157.123', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-22', ip: '10.89.156.42', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-83', ip: '10.89.157.43', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-85', ip: '10.89.157.45', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-122', ip: '10.89.157.122', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-97', ip: '10.89.157.57', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-107', ip: '10.89.157.77', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-95', ip: '10.89.157.55', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-116', ip: '10.89.157.87', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-141', ip: '10.89.156.78', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-35', ip: '10.89.156.55', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-111', ip: '10.89.157.81', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-108', ip: '10.89.157.78', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-104', ip: '10.89.157.74', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-cipres-02', ip: '10.89.157.42', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-127', ip: '10.89.157.127', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-120', ip: '10.89.157.120', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-192', ip: '10.89.112.58', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-113', ip: '10.89.157.83', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-124', ip: '10.89.157.124', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-131', ip: '10.89.156.28', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-130', ip: '10.89.156.26', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-126', ip: '10.89.157.126', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-137', ip: '10.89.156.58', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-110', ip: '10.89.157.80', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-54', ip: '10.89.156.74', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-43', ip: '10.89.156.63', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-vigik-xp3', ip: '10.89.157.37', cluster:'VM (CLS_MESSI)', type: 'WinXP'},
    {hostname: 'messi-win7-146', ip: '10.89.157.189', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-154', ip: '10.89.112.11', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-203', ip: '10.89.112.70', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-191', ip: '10.89.112.57', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-177', ip: '10.89.112.39', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-152', ip: '10.89.112.7', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-169', ip: '10.89.112.30', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-151', ip: '10.89.112.4', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-179', ip: '10.89.112.41', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-164', ip: '10.89.112.22', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-176', ip: '10.89.112.37', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-174', ip: '10.89.112.35', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-182', ip: '10.89.112.44', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-175', ip: '10.89.112.36', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-185', ip: '10.89.112.47', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-193', ip: '10.89.112.60', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-vigik-w74', ip: '10.89.112.55', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-199', ip: '10.89.112.66', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-197', ip: '10.89.112.64', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-vigik-w75', ip: '10.89.112.59', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-207', ip: '10.89.112.75', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-200', ip: '10.89.112.67', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-206', ip: '10.89.112.74', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-80', ip: '10.89.156.100', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-winxp-01', ip: '10.89.156.180', cluster:'VM (CLS_MESSI)', type: 'WinXP'},
    {hostname: 'messi-win7-196', ip: '10.89.112.63', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-neo-w7-01', ip: '10.89.157.62', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-neo-xp-00', ip: '10.89.157.63', cluster:'VM (CLS_MESSI)', type: 'WinXP'},
    {hostname: 'messi-win7-27', ip: '10.89.156.47', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-59', ip: '10.89.156.79', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-CESV0180', ip: '10.89.157.217', cluster:'VM (CLS_MESSI)', type: 'Win7 Ent SP1'},
    {hostname: 'messi-CESV0181', ip: '10.89.157.218', cluster:'VM (CLS_MESSI)', type: 'Win7 Ent SP1'},
    {hostname: 'messi-cipres-01', ip: '10.89.156.106', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-coc-w7', ip: '10.89.156.159', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-CPNV1054', ip: '10.89.157.181', cluster:'VM (CLS_MESSI)', type: 'Win7 Ent SP1'},
    {hostname: 'messi-CPNV1059', ip: '10.89.157.179', cluster:'VM (CLS_MESSI)', type: 'Win7 Ent SP1'},
    {hostname: 'messi-CPNV1061', ip: '10.89.157.219', cluster:'VM (CLS_MESSI)', type: 'Win7 Ent SP1'},
    {hostname: 'messi-escalisi', ip: '10.89.157.112', cluster:'VM (CLS_MESSI)', type: 'Windows 10 upd 1703'},
    {hostname: 'messi-geopad-w7', ip: '10.89.156.160', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-geric-w10', ip: '10.89.156.157', cluster:'VM (CLS_MESSI)', type: 'Win 10 Pro'},
    {hostname: 'messi-geric-xp', ip: '10.89.156.171', cluster:'VM (CLS_MESSI)', type: 'WinXP'},
    {hostname: 'messi-lotint-01', ip: '10.89.157.18', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-lotint-02', ip: '10.89.157.19', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-make-msi', ip: '10.89.156.228', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-orgati-w7', ip: '10.89.156.161', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-psr-w01', ip: '10.89.157.88', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-ptderuy', ip: '10.89.156.135', cluster:'VM (CLS_MESSI)', type: 'WinXP'},
    {hostname: 'messi-sirop-xp', ip: '10.89.156.145', cluster:'VM (CLS_MESSI)', type: 'WinXP'},
    {hostname: 'messi-ssif-gds', ip: '10.89.156.119', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-syspeo-w7', ip: '10.89.156.130', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-syspl-dev', ip: '10.89.156.202', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-vigik-w73', ip: '10.89.112.18', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-w7-neo', ip: '10.89.157.16', cluster:'VM (CLS_MESSI)', type: 'Win7  =>  Win10'},
    {hostname: 'messi-win7-arc1', ip: '10.89.156.221', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    {hostname: 'messi-win7-dba1', ip: '10.89.156.220', cluster:'VM (CLS_MESSI)', type: 'Win7'},
    
];


Array.prototype.uniq = function(){
    for(var i = 0, l = this.length; i < l; ++i){
        var item = this[i];
        var duplicateIdx = this.indexOf(item, i + 1);
        while(duplicateIdx != -1) {
            this.splice(duplicateIdx, 1);
            duplicateIdx = this.indexOf(item, duplicateIdx);
            l--;
        }
    }
    return this;
}


/*
{label: "Windows 7", value: ""}
{label: "Windows 10", value: "windows 10"}
{label: "Windows XP", value: "windows xp"}
{label: "Windows 8", value: "windows 8"}
*/
let vdiFound = new ReactiveVar(0);
let vdiNotFound = new ReactiveVar(0);

Template.check.helpers({
    'getVdiFound': () => {
        return vdiFound.get();
    },
    'getVdiNotFound': () => {
        return vdiNotFound.get();
    },
    'notExistingVdi': () => {
        foundCounter = 0;
        notFoundCounter = 0;
        _vdiIP = []; // here we push all unmatched ip address
        _inventaire = collections.myvdi.find({$or: [
            {type: 'windows 7'}, {type: 'windows xp'}, {type: 'windows 10'}, {type: 'windows 8'}
        ]}).fetch();
        //console.log(_vdiInfo.length + ' objects to analyse and inventory containe : ' + _inventaire.length);
        // check object by object in the inventory
        for(let i=0; i<_vdiInfo.length; i++) {
            ipToCheck = _vdiInfo[i].ip;
            // let check the IP
            found = false;
            for(let y=0; y<_inventaire.length; y++) {
                if(ipToCheck === _inventaire[y].ip) {
                    //console.log(ipToCheck + ' found in the inventory ' + _inventaire[y].ip);
                    found = true;
                    foundCounter += 1;
                    break;
                }
            }
            if(!found) {
                notFoundCounter += 1;
                _vdiIP.push(_vdiInfo[i]);
            }
        }
        //console.log('N vdi found : ' + foundCounter);
        //console.log('N vdi not found in inventory : ' + notFoundCounter);
        //console.log(_vdiIP);
        vdiFound.set(_vdiIP.length);
        return _vdiIP;
    },
    'reverseNotExistingVdi': () => {
        foundCounter = 0;
        notFoundCounter = 0;
        _vdiIPreverse = []; // here we push all unmatched ip address
        _inventaire = collections.myvdi.find({$or: [
            {type: 'windows 7'}, {type: 'windows xp'}, {type: 'windows 10'}, {type: 'windows 8'}
        ]}).fetch();
        //console.log(_inventaire.length + ' objects to analyse and inventory containe : ' + _vdiInfo.length);
        // check object by object in the inventory
        for(let i=0; i<_inventaire.length; i++) {
            ipToCheck = _inventaire[i].ip;
            // let check the IP
            found = false;
            for(let y=0; y<_vdiInfo.length; y++) {
                if(ipToCheck === _vdiInfo[y].ip) {
                    //console.log(ipToCheck + ' found in the inventory ' + _inventaire[y].ip);
                    found = true;
                    foundCounter += 1;
                    break;
                }
            }
            if(!found) {
                notFoundCounter += 1;
                _vdiIPreverse.push(_inventaire[i]);
            }
        }
        //console.log('N vdi found : ' + foundCounter);
        //console.log('N vdi not found in inventory : ' + notFoundCounter);
        //console.log(_vdiIPreverse);
        vdiNotFound.set(_vdiIPreverse.length);
        return _vdiIPreverse;
    }
});

