import numpy as np
import copy
from prettytable import PrettyTable

index = 0
fontSet = -1

def extractData(input_file, return_input,  target_size):
        #Returns a list of input letters and its corresponding output and the character
        input_raw_bipolar_vals = copy.deepcopy(return_input)
        temp = []

        global index, fontSet

        fontSet += 1

        file = open(input_file, 'r')

        for char in file.read():
                if char == "\n":
                        pass
                if char == "_":
                        temp.append(-1)
                if char == "x":
                        temp.append(1)
                if char != "_" and char != "x":
                        tmp_target = [-1]*target_size
                        if char == "A":
                                temp.append(1)
                                tmp_target[index] = 1
                                index += 1
                                input_raw_bipolar_vals.append((np.array(temp), np.array(tmp_target), char+str(fontSet)))
                                temp = []
                        elif char == "B":
                                temp.append(1)
                                tmp_target[index] = 1
                                index += 1
                                input_raw_bipolar_vals.append((np.array(temp), np.array(tmp_target), char+str(fontSet)))
                                temp = []
                        elif char == "C":
                                temp.append(1)
                                tmp_target[index] = 1
                                index += 1
                                input_raw_bipolar_vals.append((np.array(temp), np.array(tmp_target), char+str(fontSet)))
                                temp = []
                        elif char == "D":
                                temp.append(1)
                                tmp_target[index] = 1
                                index += 1
                                input_raw_bipolar_vals.append((np.array(temp), np.array(tmp_target), char+str(fontSet)))
                                temp = []
                        elif char == "E":
                                temp.append(1)
                                tmp_target[index] = 1
                                index += 1
                                input_raw_bipolar_vals.append((np.array(temp), np.array(tmp_target), char+str(fontSet)))
                                temp = []
                        elif char == "J":
                                temp.append(1)
                                tmp_target[index] = 1
                                index += 1
                                input_raw_bipolar_vals.append((np.array(temp), np.array(tmp_target), char+str(fontSet)))
                                temp = []
                        elif char == "K":
                                temp.append(1)
                                tmp_target[index] = 1
                                index += 1
                                input_raw_bipolar_vals.append((np.array(temp), np.array(tmp_target), char+str(fontSet)))
                                temp = []
                        elif char == "L":
                                temp.append(1)
                                tmp_target[index] = 1
                                index += 1
                                input_raw_bipolar_vals.append((np.array(temp), np.array(tmp_target), char+str(fontSet)))
                                temp = []
                        elif char == "R":
                                temp.append(1)
                                tmp_target[index] = 1
                                index += 1
                                input_raw_bipolar_vals.append((np.array(temp), np.array(tmp_target), char+str(fontSet)))
                                temp = []

        return input_raw_bipolar_vals

def initiateRandomWeights(num_letters):
        #Returns a 2D matrix containing random weights for corresponding letters input
        return [np.random.random(size=64) for i in range(num_letters)]

def output(y, threshold):
        if y < threshold:
                return -1
        else:
                return 1

def training(training_set, weights, alpha, threshold):
        iterations = 0
        
        while True:

                error_count = 0
                iterations += 1


                for x, target, letter in training_set:
                        #going through each input

                        for j in range(len(training_set)):
                                #going through the training set for each input
                                xw = np.dot(x, weights[j]) 

                                y_in = output(xw, threshold)

                                error = target[j] - y_in

                                if error != 0:
                                        #print "not same!"
                                        weights[j] +=  alpha  * error * x
                                        error_count += 1
                                
                if error_count == 0:
                        break

        return weights, iterations

def testing(data, weight, noise, threshold):
        global fontSet

        count = copy.deepcopy(fontSet)

        testing_data = copy.deepcopy(data)

        total_error = {}

        while count >= 0:
                total_error["A"+str(count)] = {'output_val': [], 'missplaced': 0, 'taget_val': []}
                total_error["B"+str(count)] = {'output_val': [], 'missplaced': 0, 'taget_val': []}
                total_error["C"+str(count)] = {'output_val': [], 'missplaced': 0, 'taget_val': []}
                total_error["D"+str(count)] = {'output_val': [], 'missplaced': 0, 'taget_val': []}
                total_error["E"+str(count)] = {'output_val': [], 'missplaced': 0, 'taget_val': []}
                total_error["J"+str(count)] = {'output_val': [], 'missplaced': 0, 'taget_val': []}
                total_error["K"+str(count)] = {'output_val': [], 'missplaced': 0, 'taget_val': []}
                total_error["L"+str(count)] = {'output_val': [], 'missplaced': 0, 'taget_val': []}
                total_error["R"+str(count)] = {'output_val': [], 'missplaced': 0, 'taget_val': []}
                count -= 1


        if noise:
                for x in range(len(testing_data)):
                        #a list of amount of noise randomly chosen in the input
                        displ_val = np.random.randint(0, 64, size=noise)

                        for i in displ_val:
                                if testing_data[x][0][i] == -1:
                                        testing_data[x][0][i] = 1
                                else:
                                        testing_data[x][0][i] = -1

        
        for x, target, letter in testing_data:
                outputv = []
                for i in range(0, len(testing_data)):
                        xw = np.dot(x, weights[i])
                        y_in = output(xw, threshold)
                        error = target[i] - y_in

                        if error != 0:
                                total_error[letter]['missplaced'] += 1
                                #break
                        total_error[letter]['output_val'].append(y_in)
                        outputv.append(y_in)
                total_error[letter]['target_val'] = target
                #print letter, outputv

        return total_error

def generate_report(result, noise):

        print "Noise: ", noise

        x = PrettyTable(["","# Missplaced", "Output", "Target"])

        for i in sorted(result):
                x.add_row([i, result[i]['missplaced'], np.array(result[i]['output_val']), result[i]['target_val']])

        x.align["Output"] = "l"
        print x


if __name__ == '__main__':
        #get the training data
        #input_files = ['input4.txt', 'input5.txt', 'input6.txt']

        input_files = ['input.txt']#,'input2.txt']#, 'input3.txt']

        total_input_files = len(input_files)

        #training_data = extractData('input.txt', 7*total_input_files)
        training_data = []
        for file in input_files:
                training_data = extractData(file, training_data ,9*total_input_files)

        #get the weights for the data
        weights = initiateRandomWeights(9*total_input_files)

        learning_rate = 0.1
        threshold = 5 #0.5
        noise = 2

        final_weights, iterations = training(training_data, weights, learning_rate, threshold)
        
        print "iterations to converge: ", iterations

        total_error = testing(training_data, final_weights, noise, threshold)

        generate_report(total_error, noise)

        total_error = testing(training_data, final_weights, 5, threshold)

        generate_report(total_error, 5)

        total_error = testing(training_data, final_weights, 10, threshold)

        generate_report(total_error, 10)

        total_error = testing(training_data, final_weights, 15, threshold)

        generate_report(total_error, 15)

        total_error = testing(training_data, final_weights, 20, threshold)

        generate_report(total_error, 20)

